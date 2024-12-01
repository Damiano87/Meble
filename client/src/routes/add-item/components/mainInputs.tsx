const MainInputs = () => {
  return (
    <section className="space-y-3">
      {/* name */}
      <div>
        <label htmlFor="name" className="custom-label">
          name
        </label>
        <input
          type="text"
          id="name"
          className="custom-input input input-bordered"
        />
      </div>
      {/* price */}
      <div>
        <label htmlFor="price" className="custom-label">
          price
        </label>
        <input
          type="number"
          id="price"
          className="custom-input input input-bordered"
        />
      </div>
      {/* category */}
      <div>
        <label htmlFor="category" className="custom-label">
          category
        </label>
        <input
          type="text"
          id="category"
          className="custom-input input input-bordered"
        />
      </div>
      {/* likes */}
      <div>
        <label htmlFor="likes" className="custom-label">
          likes
        </label>
        <input
          type="number"
          id="likes"
          className="custom-input input input-bordered"
        />
      </div>
      {/* title */}
      <div>
        <label htmlFor="title" className="custom-label">
          title
        </label>
        <input
          type="text"
          id="title"
          className="custom-input input input-bordered"
        />
      </div>
      {/* description */}
      <div>
        <label htmlFor="description" className="custom-label">
          description
        </label>
        <textarea
          id="description"
          rows={5}
          className="textarea textarea-bordered border-2 border-black w-full focus:outline-none focus:border-amber-500 max-w-[40rem]"
        />
      </div>
      {/* inStore */}
      <div className="flex items-start gap-4">
        <label htmlFor="inStore" className="custom-label">
          In store?
        </label>
        <input
          type="checkbox"
          id="inStore"
          defaultChecked
          className="checkbox checkbox-accent accent-amber-500 ring-1 ring-black checkbox-md"
        />
      </div>
    </section>
  );
};
export default MainInputs;
