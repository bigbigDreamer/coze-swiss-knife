import { transpileDeclaration } from 'typescript';
import { createFilter } from '@rollup/pluginutils';

import { consola } from "consola";

function generateDTS(options = {}) {
    return {
        name: "generateDTS",
        buildStart() {
            this.DTSTimeStart = Date.now();
            consola.info("Generate DTS Start");
        },
        buildEnd() {
            consola.success("Generate DTS End，Time Delay: ", Date.now() - this.DTSTimeStart, "ms");
        },
        transform(code, id) {
            const filter = createFilter(options.include, options.exclude);
            if (!filter(id)) return;
            const [path, ext]  = id.split(".");
            const [fileName] = path.split('/').slice(-1)
            if(ext === 'ts') {
                const dts = transpileDeclaration(code, {
                    compilerOptions: {
                        isolatedDeclarations: true,
                        composite: true
                    }
                });
                this.emitFile({
                    type: 'asset',
                    fileName: `${fileName}.d.ts`,
                    source: dts.outputText
                })
            }
            return  {
                code: code,
                map: null
            };
        }
    }
}

export  default  generateDTS
