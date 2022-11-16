import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import ProductEditScreen from '../screens/ProductEditScreen';
import ProductListScreen from '../screens/ProductListScreen';
import '../css/style.css'

import { hideLoading, parseRequestUrl, showLoading } from '../utils';
import Error404Screen from '../screens/Error404Screen';
import SigninScreen from '../screens/SigninScreen';
import Header from '../components/Header';
import Aside from '../components/Aside';


const routes = {
    '/': HomeScreen,
  '/product/:id/edit': ProductEditScreen,
  '/product/:id': ProductScreen,
  '/signin': SigninScreen,
  '/productlist': ProductListScreen,
 
};
const router = async () => {
    showLoading();
    const request = parseRequestUrl();
    const parseUrl = (request.resource ? `/${request.resource}` : '/')
        + (request.id ? '/:id' : '')
        + (request.verb ? `/${request.verb}` : '');
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
    const header = document.getElementById('header-container');
   header.innerHTML = await Header.render();
  await Header.after_render(); 

   const aside = document.getElementById('aside-container');
  aside.innerHTML = await Aside.render();
  await Aside.after_render(); 

    const main = document.getElementById('main-container');
    main.innerHTML = await screen.render();
    if (screen.after_render) await screen.after_render();
    hideLoading();
};
window.addEventListener('load', router);
window.addEventListener('hashchange', router);
