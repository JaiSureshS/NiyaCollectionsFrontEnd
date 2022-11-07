const DashboardMenu = {
  render: (props) => `
    <div class="dashboard-menu">
      <ul>
        <li class="${props.selected === 'products' ? 'selected' : ''}">
          <a href="/#/productlist">Products</a>
        </li>
      </ul>
    </div>
    `,
};
export default DashboardMenu;
