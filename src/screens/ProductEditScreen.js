import {
  parseRequestUrl,
  showLoading,
  showMessage,
  hideLoading,
} from '../utils';
import { getProduct, updateProduct, uploadProductImage } from '../api';

const ProductEditScreen = {
  after_render: () => {
    const request = parseRequestUrl();
    document
      .getElementById('edit-product-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        showLoading();
        const data = await updateProduct({
          _id: request.id,
          name: document.getElementById('name').value,
          image: document.getElementById('image').value,
          category: document.getElementById('category').value,
        });
        hideLoading();
        if (data.error) {
          showMessage(data.error);
        } else {
          document.location.hash = '/productlist';
        }
      });
    document
      .getElementById('image-file')
      .addEventListener('change', async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        showLoading();
        const data = await uploadProductImage(formData);
        hideLoading();
        if (data.error) {
          showMessage(data.error);
        } else {
          showMessage('Image uploaded successfully.');
          document.getElementById('image').value = data.image;
        }
      });
  },
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    return `
    <div class="content">
      <div>
        <a href="/#/productlist">Back to products</a>
      </div>
      <div class="form-container">
        <form id="edit-product-form">
          <ul class="form-items">
            <li>
              <h1>Edit Product ${product._id.substring(0, 8)}</h1>
            </li>
            <li>
              <label for="name">Name</label>
              <input type="text" name="name" value="${
                product.name
              }" id="name" />
            </li>
            <li>
              <label for="image">Image (680 x 830)</label>
              <input type="text" name="image" value="${
                product.image
              }" id="image" />
              <input type="file" name="image-file" id="image-file" />
            </li>
            <li>
              <label for="category">Category</label>
              <input type="text" name="category" value="${
                product.category
              }" id="category" />
            </li>
            
            <li>
              <button type="submit" class="primary">Update</button>
            </li>
          </ul>
        </form>
      </div>

    </div>
    `;
  },
};
export default ProductEditScreen;
