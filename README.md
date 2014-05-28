# Sprung

[Springpad.com](http://springpad.com/) (like too many other "cloud"
apps I've used) is shutting down. Thankfully, Springpad is making
[exports available](https://springpad.com/blog/2014/05/springpad-says-goodbye/)
to users as a simple HTML/JS/CSS viewer application and JSON data.

Sadly, that's nearly like being handed a print out. Our "modern"
filesystems give us little in the way of data *knowledge* and even
less in the way of curation, aggregation, annotation, and organization.

However! [Apache CouchDB](http://couchdb.apache.org/) is "built of the
Web" and is therefore quite concious of such needs.

## Installation

**Note:** I fully intend to make this all much easier. "Geeks" only atm.
Sorry. :frown:

Install [couchapp.py](http://github.com/couchapp/couchapp)
(or other `couchapp.py` compatible thing).

```
$ couchapp push . http://USER:PASS@localhost:5984/sprung/
```

Change the URL above to the be the URL of the CouchDB or
[Cloudant](http://cloudant.com/) database you'd like to keep your Springpad
data in.

Once that's done, visit the URL `couchapp` gives you. Which will be
something like: `http://localhost:5984/sprung/_design/sprung/index.html`

## Future

The viewer code kindly provided by Springpad sadly lacks license information,
so it looks like I'll be rebuilding it with [Vue.js](http://vuejs.com/) as
part of this project.

## License

[Apache License 2.0](http://apache.org/licenses/LICENSE-2.0)
