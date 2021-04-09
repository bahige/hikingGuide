export const authHeader =()  => {
    const user = JSON.parse(localStorage.getItem('userInfo'));

    if (user && user.token && user.isAdmin) {
      return { Authorization: 'Bearer ' + user.token };
    } else {
      return {};
    }
  }


  export const userAuthHeader =()  => {
    const user = JSON.parse(localStorage.getItem('userInfo'));

    if (user && user.token) {
      return { Authorization: 'Bearer ' + user.token };
    } else {
      return {};
    }
  }


  export const orgAuthHeader =()  => {
    const tourOrganizer = JSON.parse(localStorage.getItem('orgInfo'));
    console.log(tourOrganizer);

    if (tourOrganizer && tourOrganizer.token) {
      return { Authorization: 'Bearer ' + tourOrganizer.token };
    } else {
      return {};
    }
  }