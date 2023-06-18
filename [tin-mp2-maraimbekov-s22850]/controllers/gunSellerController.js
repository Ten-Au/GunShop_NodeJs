const GunSellerRepository = require('../repository/mysql2/GunSellerRepository')

exports.showGunSellerList = (req, res, next) => {
    GunSellerRepository.getGunSellers()
        .then(guns => {
            res.render('Pages/GunSellers/list', {
                guns: guns,
                navLocation: 'gunsellers'
            });
        });
}
exports.showAddGunSellerForm = (req, res, next) => {
    res.render('Pages/GunSellers/form', {
        gun: {},
        pageTitle: 'New Gun Seller',
        formMode: 'createNew',
        btnLabel: 'Add Gun Seller',
        formAction: '/gunsellers/add',
        navLocation: 'gunsellers',
        validationErrors: []
    })
}
exports.showGunSellerDetails = (req, res, next) => {
    const gunId = req.params.gunId;
    GunSellerRepository.getGunSellerById(gunId)
        .then(gun => {
            res.render('Pages/GunSellers/form', {
                gun: gun,
                formMode: 'showDetails',
                pageTitle: 'Gun Seller details',
                formAction: '',
                navLocation: 'gunsellers',
                validationErrors: []
            });
        });
}
exports.showGunSellerEdit = (req, res, next) => {
    const gunId = req.params.gunId;
    GunSellerRepository.getGunSellerById(gunId)
        .then(gun => {
            res.render('Pages/GunSellers/form', {
                gun: gun,
                formMode: 'edit',
                pageTitle: 'Edit Gun Seller',
                btnLabel: 'Edit Gun Seller',
                formAction: '/gunsellers/edit',
                navLocation: 'gunsellers',
                validationErrors: []
            });
        });
}

exports.addGunSeller = (req, res, next) => {
  const gunData = {...req.body};
  console.log(gunData)
  GunSellerRepository.createGunSeller(gunData)
      .then( result => {
          res.redirect('/gunsellers');
      })
      .catch(err => {
          res.render('Pages/GunSellers/form', {
              gun: gunData,
              pageTitle: 'Adding a gun seller',
              formMode: 'createNew',
              btnLabel: 'Add gun seller',
              formAction: '/gunsellers/add',
              navLocation: 'gunsellers',
              validationErrors: err.details
          })
      });
};

exports.updateGunSeller = (req, res, next) => {
    const gunId = req.body._id;
    const gunData = {...req.body};
    console.log(gunId, gunData)
    GunSellerRepository.updateGunSeller(gunId, gunData)
        .then(result => {
            res.redirect('/gunsellers');
        })
        .catch(err => {
            res.render('Pages/GunSellers/form', {
                gun: gunData,
                pageTitle: 'Editing a gun seller',
                formMode: 'edit',
                btnLabel: 'Edit gun seller',
                formAction: '/gunsellers/edit',
                navLocation: 'gunsellers',
                validationErrors: err.details
            })
        });
};

exports.deleteGunSeller = (req, res, next) => {
    const gunId = req.params.gunId;
    GunSellerRepository.deleteGunSeller(gunId)
        .then( () => {
            res.redirect('/gunsellers');
        });
};