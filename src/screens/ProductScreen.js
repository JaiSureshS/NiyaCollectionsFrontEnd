import {
  parseRequestUrl,
  showLoading,
  hideLoading,
  
} from '../utils';
import { getProduct } from '../api';


const ProductScreen = {
  after_render: () => {
    
  },
  render: async () => {
    const request = parseRequestUrl();
    showLoading();
    const product = await getProduct(request.id);
    if (product.error) {
      return `<div>${product.error}</div>`;
    }
    hideLoading();
    return `
    <div class="content">
      <div class="back-to-result">
        <a href="/#/">Back to result </a>
      </div>
      <div class="details">
        <div class="details-image">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="details-info">
          <ul>
            <li>
              <h1>${product.name}</h1>
            </li>
          </ul>
        </div>
      </div>
    </div>`;
  },
};
export default ProductScreen;
