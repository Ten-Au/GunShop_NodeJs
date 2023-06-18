const GunSellerRepository = require('../repository/mysql2/GunSellerRepository');


exports.getGunSellers = (req, res, next) => {
    GunSellerRepository.getGunSellers()
        .then(guns => {
            res.status(200).json(guns)
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getGunSellerById = (req, res, next) => {
    const gunId = req.params.gunId;
    GunSellerRepository.getGunSellerById(gunId)
        .then(cus => {
            if(!cus) {
                res.status(404).json({
                    message: 'Gun Seller with id: '+gunId+' not found'
                })
            } else {
                res.status(200).json(cus);
            }
        });
};

exports.createGunSeller = (req, res, next) => {
    GunSellerRepository.createGunSeller(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateGunSeller = (req, res, next) => {
    const gunId = req.params.gunId;
    GunSellerRepository.updateGunSeller(gunId, req.body)
        .then(result => {
            res.status(200).json({message: 'Gun Seller updated!', gun: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteGunSeller = (req, res, next) => {
    const gunId = req.params.gunId;
    GunSellerRepository.deleteGunSeller(gunId)
        .then(result => {
            res.status(200).json({message: 'Removed Gun Seller', gun: result});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}