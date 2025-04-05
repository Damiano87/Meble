import { Request, Response } from "express";
import prisma from "../lib/prisma.js";
import nodemailer from "nodemailer";

// Format the price above to PLN using the locale, style, and currency.
function formatToPLN(price: number) {
  const zloty = price / 100;

  return zloty.toLocaleString("pl-PL", {
    style: "currency",
    currency: "PLN",
  });
}

// @desc Get user wishlist ==============================================================
// @route GET /wishlist
// @access Private
export const getWishlist = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.userId;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  try {
    const skip = (page - 1) * limit;

    // get wishlist items and total count
    const [wishlistItems, total] = await Promise.all([
      prisma.wishlist.findMany({
        where: {
          userId,
        },
        select: {
          id: true,
          productId: true,
          product: {
            select: {
              name: true,
              price: true,
              images: true,
              stock: true,
            },
          },
        },
        skip,
        take: limit,
      }),
      prisma.wishlist.count({
        where: {
          userId,
        },
      }),
    ]);

    // prepare pagination data
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    // Cache-Control header to control caching behavior
    // res.set("Cache-Control", "private, max-age=300"); // 5 minutues cache

    res.status(200).json({
      status: "success",
      data: {
        items: wishlistItems,
        pagination: {
          total,
          totalPages,
          currentPage: page,
          limit,
          hasNextPage,
          hasPrevPage,
        },
      },
    });
    return;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : "Unknown error";
    console.error("Wishlist fetch error:", {
      userId,
      error: errorMessage,
      stack: errorStack,
    });
  }
};

// @desc Add to wishlist ==============================================================
// @route POST /wishlist
// @access Private
export const addToWishlist = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.userId as string;
  const { productId } = req.body;

  try {
    await prisma.wishlist.create({
      data: {
        userId,
        productId,
      },
    });
    res.status(201).json({ message: "Product added to wishlist" });
  } catch (error) {
    if (error instanceof Error && "code" in error) {
      const errorCode = (error as { code: string }).code;
      console.error(error);

      if (errorCode === "P2002") {
        res.status(409).json({ message: "Product already in wishlist" });
        return;
      }
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }

    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};

// @desc Delete from wishlist ==============================================================
// @route DELETE /wishlist
// @access Private
export const deleteFromWishlist = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.userId as string;
  const { productId } = req.body;

  try {
    await prisma.wishlist.delete({
      where: { userId_productId: { userId, productId } },
    });

    res.status(200).json({ message: "Product removed from wishlist" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};

// @desc Clear wishlist ==============================================================
// @route DELETE /clear-wishlist
// @access Private
export const clearWishlist = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.userId;

  try {
    // check if user has wishlist
    const wishlist = await prisma.wishlist.findMany({ where: { userId } });

    if (wishlist.length === 0) {
      res.status(404).json({ message: "Wishlist is empty" });
      return;
    }

    // clear wishlist for user
    await prisma.wishlist.deleteMany({ where: { userId } });
    res.status(200).json({ message: "Wishlist cleared" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc send wishlist to email ==============================================================
// @route POST /send-wishlist
// @access Private
export const sendWishlist = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.userId;
  const { email, destinationEmail } = req.body;

  if (!email) {
    res.status(400).json({ error: "Brak adresu email" });
    return;
  }

  try {
    // Pobierz wishlistę z bazy danych
    const wishlist = await prisma.wishlist.findMany({
      where: {
        userId,
      },
      include: {
        product: true,
      },
    });

    if (!wishlist.length) {
      res.status(404).json({ error: "Lista życzeń jest pusta" });
      return;
    }

    // format wishlist as HTML list
    const wishlistHTML = wishlist
      .map(
        (item) => `
  <li style="margin-bottom: 20px;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        <td width="80" valign="middle">
          <img src="${item.product.images[0]}" alt="${
          item.product.name
        }" width="70" height="70" style="object-fit: contain; display: block;">
        </td>
        <td width="20">&nbsp;</td>
        <td valign="middle">
          <h4 style="margin: 0 0 5px 0;">${item.product.name}</h4>
          <span style="display: block;">Cena: ${formatToPLN(
            item.product.price
          )}</span>
        </td>
      </tr>
    </table>
  </li>
  `
      )
      .join("");

    // configure transporter smtp
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: process.env.TRANSPORTER_PASSWORD,
      },
    });

    // configure mail options
    const mailOptions = {
      from: email,
      to: destinationEmail,
      subject: "Twoja lista życzeń",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
            <h2 style="color: #007bff;">Twoja lista życzeń</h2>
            <ul style="list-style-type: none; padding: 0;">${wishlistHTML}</ul>
            <p style="font-style: italic;">Dziękujemy za skorzystanie z naszej listy życzeń!</p>
        </div>`,
    };

    // send email
    await transporter.sendMail(mailOptions);

    res.json({ message: "Lista życzeń wysłana!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Błąd podczas wysyłania e-maila" });
  }
};
