const router = require('express').Router();
const { router } = require('express');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
 
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: [{ model: Product, 
      attributes:['id', 'product_name', 'stock', 'price', 'category_id'],
    }]
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
 
  Tag.findOne({
    attributes:['id', 'tag_name'],
    where: { id: req.params.id, },
    include: [
      { model: Product,
        attributes: ['id', 'product_name', 'stock', 'category_id'],
     }
    ]
  })
})
.then(dbTagData => res.json(dbTagData))
.catch(err => {
  console.log(err);
  res.status(500).json(err);
});

router.post('/', (req, res) => {
  
  Tag.create({

   //* still need this *//

  })
    .then(dbTagData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(dbTagData => {
      if (!dbTagData[0]) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  router.delete('/:id', (req, res) => {
    Tag.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbTagData => {
        if (!dbTagData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbTagData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    })
});

module.exports = router;
