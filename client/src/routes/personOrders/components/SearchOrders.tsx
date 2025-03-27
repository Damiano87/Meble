import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchOrders = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("productName") || ""
  );

  useEffect(() => {
    // sync input state with search param
    setSearchTerm(searchParams.get("productName") || "");
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      searchParams.set("productName", searchTerm.trim());
    } else {
      searchParams.delete("productName");
    }

    setSearchParams(searchParams);
  };

  return (
    <form onSubmit={handleSubmit} className="w-[250px] flex gap-4 mb-4">
      <Input
        type="text"
        name="productName"
        placeholder="Szukaj produktu..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-black"
      />
      <Button
        type="submit"
        variant="secondary"
        className="bg-amber-600 hover:bg-amber-400"
      >
        <FaMagnifyingGlass className="text-white" />
      </Button>
    </form>
  );
};

export default SearchOrders;
