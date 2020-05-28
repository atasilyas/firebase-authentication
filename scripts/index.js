const blogList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const createBlog = document.querySelector('#create-form')
const accuntDetails  = document.querySelector('.account-details')

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});


//blog operations
const setupBlogs = (data) => {

  if (data.length){
    let html = '';
    data.forEach(item => {
      const blogItem = item.data();
      const li = `
        <li>
          <div class="collapsible-header grey lighten-4">${blogItem.title}</div>
          <div class="collapsible-body white"><span>${blogItem.content}</span></div>
        </li>`;
      console.log(data);
      html += li;
    });
    blogList.innerHTML = html;
  }else {
    blogList.innerHTML = `<h5 class="center-align">Please login for view Blogs</h5>`;
  }
};

//logged links management
const setupUI = (user) => {
  if (user){
    const html = `<div style="color: darkblue">Logged in as ${user.email}</div>`;
    accuntDetails.innerHTML = html; // add account detail modal user info
    loggedInLinks.forEach(item => item.style.display = 'block'); //show logged in tag
    loggedOutLinks.forEach(item => item.style.display = 'none'); //hidee logged out linkd
  }else {
    accuntDetails.innerHTML =''; // if user logged out remove account detail modal
    loggedInLinks.forEach(item => item.style.display = 'none'); //hide logged in tag
    loggedOutLinks.forEach(item => item.style.display = 'block'); //show logged out linkd
  }
};


//create blog
createBlog.addEventListener('submit', (e) => {
  e.preventDefault();

  db.collection('blogs').add({ // add blog input value to firebase
        title: createBlog['title'].value,
        content: createBlog['content'].value
    }).then((e) => {
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close(); // close add block modal
    loginForm.reset(); // clear modal
  }).catch(err => {
    console.log(err.message); // if a hacker go to inspect html code and change css file and show create blogs ling it will handle this error. the rule will handle this.
  });
});


