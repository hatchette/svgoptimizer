
import SVGO from 'svgo'
import { readFile } from 'fs'
import chalk from 'chalk'
import { resolve } from 'path'
import { sync } from 'glob'

const svgo = new SVGO({
    plugins: [
        {
            convertTransform: true,
        },
        {
            cleanupAttrs: true,
        }, {
            cleanupIDs: true,
        },
        {
            removeDoctype: true,
        }, {
            removeXMLProcInst: true,
        }, {
            removeComments: true,
        }, {
            removeMetadata: true,
        }, {
            removeTitle: true,
        }, {
            removeDesc: true,
        }, {
            removeUselessDefs: true,
        }, {
            removeEditorsNSData: true,
        }, {
            removeEmptyAttrs: true,
        }, {
            removeHiddenElems: true,
        }, {
            removeEmptyText: true,
        }, {
            removeEmptyContainers: true,
        }, {
            removeViewBox: false,
        }, {
            cleanupEnableBackground: true,
        }, {
            convertStyleToAttrs: true,
        }, {
            convertColors: true,
        }, {
            convertPathData: true,
        }, {
            removeUnknownsAndDefaults: true,
        }, {
            removeNonInheritableGroupAttrs: true,
        }, {
            removeUselessStrokeAndFill: true,
        }, {
            removeUnusedNS: true,
        }, {
            cleanupNumericValues: true,
        }, {
            moveElemsAttrsToGroup: true,
        }, {
            moveGroupAttrsToElems: true,
        }, {
            collapseGroups: true,
        }, {
            removeRasterImages: true,
        }, {
            convertShapeToPath: {
                convertArcs: true,
                convertTransform: true,
                convertStyleToAttrs: true
            },
        }, {
            mergePaths: true,
        },
        {
            sortAttrs: true,
        }, {
            removeDimensions: true,
        }, {
            removeAttrs: { attrs: '(stroke|fill|class)' },
        }, {
            convertStyleToAttrs: true
        },
        {
            convertTransform: true,
        },
    ]
})

async function parseAll() {
    const x = resolve(process.cwd(), './input/**.svg')
    const files = sync(x)

    for (let i = 0; i < files.length; i++) {
        const file: string = files[i]
        console.log(chalk.green(file))

        readFile(file, 'utf8', async (err, data) => {
            if (err) {
                console.log(chalk.red(JSON.stringify(err)))
            }
            const result = await svgo.optimize(data, { path: file })
            console.log(chalk.blueBright(result.data))
        })

    }
}

parseAll()
