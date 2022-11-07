
export const setUserInfo = ({
  _id = '',
  name = '',
  email = '',
  password = '',
  token = '',
  isAdmin = false,
}) => {
  localStorage.setItem(
    'userInfo',
    JSON.stringify({
      _id,
      name,
      email,
      password,
      token,
      isAdmin,
    })
  );
};
export const clearUser = () => {
  localStorage.removeItem('userInfo');
};
export const getUserInfo = () => localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : { name: '', email: '', password: '' };

