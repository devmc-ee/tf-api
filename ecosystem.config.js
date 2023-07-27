module.exports = module.exports = {
  apps: [
    {
      name: 'tf-api',
      script: 'npm run start:prod',
      watch: true,
      env: {
        NODE_ENV: 'prod',
        DEBUG: '${DEBUG}',
      },
      // Delay between restart
      watch_delay: 1000,
      ignore_watch: ['node_modules', 'logs'],
      max_memory_restart: '150M',
      error_file: './logs/error.log',
      out_file: './logs/out.log',
    },
  ],
  deploy: {
    production: {
      key: '~/.ssh/id_ed25519',
      user: 'virt45858',
      host: 'milicity.eu',
      ref: 'origin/master',
      repo: 'git@github.com:devmc-ee/tf-api.git',
      path: '/data02/virt45858/node-apps/tf-api',
      ssh_options: 'ForwardAgent=yes',
      'pre-deploy-local': '',
      'post-deploy':
        'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
