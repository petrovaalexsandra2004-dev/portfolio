export default {
  name: 'testimonial',
  title: 'Отзыв',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Имя клиента',
      type: 'string',
      validation: (R) => R.required(),
    },
    {
      name: 'company',
      title: 'Компания / проект',
      type: 'string',
    },
    {
      name: 'text',
      title: 'Текст отзыва',
      type: 'text',
      rows: 4,
      validation: (R) => R.required().min(20),
    },
    {
      name: 'rating',
      title: 'Оценка (1–5)',
      type: 'number',
      initialValue: 5,
      validation: (R) => R.required().min(1).max(5).integer(),
    },
    {
      name: 'approved',
      title: 'Опубликовать на сайте',
      type: 'boolean',
      initialValue: false,
      description: 'Только одобренные отзывы отображаются на сайте',
    },
    {
      name: 'order',
      title: 'Порядок отображения',
      type: 'number',
      initialValue: 99,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'company',
      approved: 'approved',
    },
    prepare({ title, subtitle, approved }) {
      return {
        title: `${approved ? '✅' : '⏳'} ${title}`,
        subtitle: subtitle ?? '—',
      };
    },
  },
  orderings: [
    {
      title: 'Порядок (по полю order)',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Дата добавления (новые сначала)',
      name: 'createdDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
};
