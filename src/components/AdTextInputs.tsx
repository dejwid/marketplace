import {categories} from "@/libs/helpers";

export type AdTexts = {
  title?: string;
  price?: string|number;
  category?: string;
  description?: string;
  contact?: string;
};

type Props = {
  defaultValues: AdTexts;
};

export default function AdTextInputs({defaultValues}:Props) {
  return (
    <>
      <label htmlFor="titleIn">Title</label>
      <input
        name="title"
        id="titleIn"
        type="text"
        placeholder="Title"
        defaultValue={defaultValues.title}
      />

      <label htmlFor="priceIn">Price</label>
      <input
        name="price"
        id="priceIn"
        type="number"
        placeholder="Price"
        defaultValue={defaultValues.price}
      />

      <label htmlFor="categoryIn">Category</label>
      <select
        name="category"
        id="categoryIn"
        defaultValue={defaultValues.category || "0"}
      >
        <option disabled value="0">select category</option>
        {categories.map(({key:categoryKey,label:categoryLabel}) => (
          <option key={categoryKey} value={categoryKey}>{categoryLabel}</option>
        ))}
      </select>

      <label htmlFor="descriptionIn">Description</label>
      <textarea
        name="description"
        id="descriptionIn"
        placeholder="description"
        defaultValue={defaultValues.description}
      ></textarea>

      <label htmlFor="contactIn">Contact information</label>
      <textarea
        name="contact"
        id="contactIn"
        placeholder="mobile: +46 723 123 123"
        defaultValue={defaultValues.contact}
      ></textarea>
    </>
  );
}