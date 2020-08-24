<h1>Notes</h1>

<h3>Setup</h3>
"watch": "tsc -w" => run ts with watch flag, recompiles every time a change in TS is detected. It will then compile and create dist folder.

"dev": "nodemon dist/index.js" => re-executes JS code that changes in the dist folder

<h3>PostgreSQL</h3>
<p>Installed through Homebrew (Mac OS)</p>
<p>
<strong>Start manually:</strong>
pg_ctl -D /usr/local/var/postgres start

<strong>Stop manually:</strong>
pg_ctl -D /usr/local/var/postgres stop

<strong>Start automatically:</strong>
"To have launchd start postgresql now and restart at login:"
brew services start postgresql
</p>
<h3>MikroORM</h3>
<ul>
<li>npx mikro-orm migration:create   # Create new migration with current schema diff</li>
<li>npx mikro-orm migration:up       # Migrate up to the latest version</li>
<li>npx mikro-orm migration:down     # Migrate one step down</li>
<li>npx mikro-orm migration:list     # List all executed migrations</li>
<li>npx mikro-orm migration:pending  # List all pending migrations</li>
</ul>
