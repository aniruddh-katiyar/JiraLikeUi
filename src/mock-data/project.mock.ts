export const PROJECT = {
  id: 1,
  name: 'Website Revamp',
  key: 'WR',

  epics: [
    {
      id: 101,
      title: 'User Authentication',
      stories: [
        {
          id: 201,
          title: 'Login Feature',
          tasks: [
            { id: 301, title: 'Login UI', status: 'TODO' },
            { id: 302, title: 'Login API', status: 'IN_PROGRESS' }
          ]
        },
        {
          id: 202,
          title: 'Registration Feature',
          tasks: [
            { id: 303, title: 'Registration UI', status: 'DONE' }
          ]
        }
      ]
    }
  ]
};
