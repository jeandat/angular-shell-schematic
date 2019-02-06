import { strings } from '@angular-devkit/core';
import { apply, branchAndMerge, mergeWith, Rule, template, url } from '@angular-devkit/schematics';
import { Schema } from './schema';

export default function (options:Schema):Rule {
    if (process.env.VERBOSE) console.log('options:', options);
    if (!options.name) {
        throw new Error(`Invalid options, "name" is required.`);
    }
    if (!options.directory) {
        options.directory = options.name;
    }
    if(!options.title) {
        options.title = options.name;
    }
    return () => {
        const templateSource = apply(url('./files'), [
            template({
                ...strings,
                ...(options as object)
            })
        ]);
        return branchAndMerge(mergeWith(templateSource));
    };
}
