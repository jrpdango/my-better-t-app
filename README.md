# my-better-t-app

To run, use `pnpm install` to get dependencies.
Once done, run `pnpm dev` to run the web app and server.

Check `no-BE` branch for version with theme page, etc. but no backend connection.
Check `connect-BE` branch for version connected to backend but I accidentally broke the sidebar :^)

The `no-BE` branch had a better sidebar per site and some additional pages but they got lost when I connected to the backend. 
The `connect-BE` branch has Clerk auth enabled and is connected to a Postgres Supabase DB, so it has a schema. 

I wasn't able to finish the pages view and navigation builder, nor continue the backend.
Not really proud of this one, but I did learn a lot (the hard way, haha) on how to improve my workflow and how I can do better in future projects.

---
I'd also like to note that Cursor seems to get very laggy after about an hour or so of work. Doesn't seem to be a memory leak or anything, but anyway it's just something to note.
