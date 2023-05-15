import oclif from "@oclif/core";

process.env.NODE_ENV = "development";
oclif.settings.debug = true;

oclif
    .run(process.argv.slice(2), import.meta.url)
    .then(oclif.flush)
    .catch(oclif.Errors.handle);
