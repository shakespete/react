<h1>Notes</h1>

<h3>Setup</h3>
"watch": "tsc -w" => run ts with watch flag, recompiles every time a change in TS is detected. It will then compile and create dist folder.

"dev": "nodemon dist/index.js" => re-executes JS code that changes in the dist folder

<h3>PostgreSQL</h3>
Installed through Homebrew (Mac OS)

<strong>Start manually:</strong>
pg_ctl -D /usr/local/var/postgres start

<strong>Stop manually:</strong>
pg_ctl -D /usr/local/var/postgres stop

<strong>Start automatically:</strong>
"To have launchd start postgresql now and restart at login:"
brew services start postgresql

<h3>MikroORM</h3>
npx mikro-orm migration:create   # Create new migration with current schema diff
npx mikro-orm migration:up       # Migrate up to the latest version
npx mikro-orm migration:down     # Migrate one step down
npx mikro-orm migration:list     # List all executed migrations
npx mikro-orm migration:pending  # List all pending migrations