export default {
  name: 'contactSubmission',
  title: 'Заявка с сайта',
  type: 'document',
  // заявки создаются через API — в Sanity Studio только просмотр
  __experimental_actions: ['update', 'delete'],
  fields: [
    {
      name: 'name',
      title: 'Имя',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'message',
      title: 'Сообщение',
      type: 'text',
      rows: 5,
      readOnly: true,
    },
    {
      name: 'lang',
      title: 'Язык обращения',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'status',
      title: 'Статус',
      type: 'string',
      initialValue: 'new',
      options: {
        list: [
          { title: '🆕 Новая', value: 'new' },
          { title: '👀 Просмотрена', value: 'seen' },
          { title: '✅ Обработана', value: 'done' },
        ],
        layout: 'radio',
      },
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      status: 'status',
    },
    prepare({ title, subtitle, status }) {
      const icon = status === 'new' ? '🆕' : status === 'seen' ? '👀' : '✅';
      return { title: `${icon} ${title}`, subtitle };
    },
  },
  orderings: [
    {
      title: 'Дата (новые сначала)',
      name: 'createdDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
};
