const sigupForm = document.querySelector('#signup-form');
const logout = document.querySelector('#logout');
const loginForm = document.querySelector('#login-form');
const adminForm = document.querySelector('.admin-actions');


//register
sigupForm.addEventListener('submit', (e) => {  // bu form üzeirnde apılan işşlemlere eventlisterner ekliyoruz...
    e.preventDefault();
    //kullanici bilgileri
    const email = sigupForm['signup-email'].value;
    const password = sigupForm['signup-password'].value;

    console.log(email, password);
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            bio: sigupForm['signup-bio'].value
        }); // add local user id to user collection for relational
    }).then(() => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        sigupForm.reset();
    });
});

//logout
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(res => {
    });
});


//login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //kullanici bilgileri
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(credential => {
        //close login model and reset inputs
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    });
});


//user auth listener
auth.onAuthStateChanged(user => {
    if (user) { /*onSnapshot trigger all change blogs collection all crud operation will be triggered and page will be updated*/
        console.log("onAuthStateChanged user logged in : ", user);
        //get Blog data
        db.collection('blogs').onSnapshot(data => {  // eger user  varsa bu  user blogları goster yoksa giriş yapması gerkit içerigi gormek için.
            setupBlogs(data.docs);  // if user logged in show blogs
            setupUI(user); // if user logged in show required links in header
        }, err => {
            console.log(err.message);
        });
    } else {
        setupBlogs([]); // if user logged out dont show blogs
        setupUI(user);  // if user logged out dont required user
        console.log("onAuthStateChanged user logged out : ", user);
    }
});

/* db.collection('blogs').onSnapshot(data => bu arkadas tüm db degişikliklerinde trigger edilir. refrest etmeye gerek yok bu sebepeten dolayı Crud işlemlerini hepsi realtine calısıt ekranlalr hemen update olur
*  db.collection('blogs').get().then() bu ise sadece refresh ediilirken işlenit
**/


// add admin cloud functions
adminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const adminEmail = document.querySelector('#admin-email');
    const addAdminRole = functions.httpsCallable('addAdminRole');
    addAdminRole({email: adminEmail}).then(result => {
        console.log(result);
    });
});










