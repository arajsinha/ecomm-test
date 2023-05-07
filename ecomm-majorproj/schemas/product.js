export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        hotspot: true,
      },
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 90,
      },
    },
    {
      name: 'details',
      title: 'Details',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'original',
      title: 'Original',
      type: 'number',
    },
    {
      name: 'sale',
      title: 'Sale',
      type: 'string',
    },
    {
      name: 'mattressOptions',
      title: 'Mattress Options',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'mattressSize', type: 'string', title: 'Mattress Size'},
            {
              name: 'dependentMattressDimensions',
              title: 'Dependent Mattress Dimensions',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'length',
                      title: 'Length (in)',
                      type: 'number',
                    },
                    {
                      name: 'width',
                      title: 'Width (in)',
                      type: 'number',
                    },
                    {
                      name: 'basePrice',
                      title: 'Base Price',
                      type: 'number',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'height',
      title: 'Height',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'height',
              title: 'Height (in)',
              type: 'number',
            },
            {
              name: 'basePrice',
              title: 'Base Price',
              type: 'number',
            },
          ],
        },
      ],
    },
  ],
}
