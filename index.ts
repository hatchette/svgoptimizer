
import SVGO from 'svgo'
import { readFileSync } from 'fs'
import chalk from 'chalk'
import { resolve } from 'path'
import { sync } from 'glob'

const svgo = new SVGO({
    // @ts-ignore
    multipass: 3,
    plugins: [
        {
            convertTransform: true,
        },
        {
            cleanupAttrs: true,
        }, {
            cleanupIDs: true,
        },
        { removeStyleElement: true }, 
        { convertTransform: {
            convertToShorts: true,
            // degPrecision: 3, // transformPrecision (or matrix precision) - 2 by default
            floatPrecision: 3,
            transformPrecision: 5,
            matrixToTransform: true,
            shortTranslate: true,
            shortScale: true,
            shortRotate: true,
            removeUseless: true,
            collapseIntoOne: true,
            leadingZero: true,
            negativeExtraSpace: false
        }},
        {
            removeAttrs: { attrs: '(stroke|fill|class|id|transform)' },
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
        },
        { 
            //@ts-ignore
            reusePaths: true
        }, {
            convertShapeToPath: {
                convertArcs: true
            },
        }, {
            mergePaths: {
                collapseRepeated: true,
                leadingZero: false,
                negativeExtraSpace: false
            },
        },
        {
            removeDimensions: true,
        },  {
            convertStyleToAttrs: true
        },
        {
            removeUselessDefs: true,
        },
    ]
})

async function getSinglePath(data: string, file: string) {
    const result = await svgo.optimize(data, { path: file })
    // join paths manually, only return single path
    return result.data.split(/(?:.*?)\<path d=\"(.*?)(?:\"\/\>)|(?:.*)/).join(" ").trim()
}

function getName(fileName: string) {
    return fileName.replace(/.*\/(.*?).svg/, "$1")
}

declare type SvgCodeJson = {
    svgCodes: Array<{
        name: string,
        d: string
    }>
}

async function parseAll() {
    const x = resolve(process.cwd(), './input/**.svg')
    const files = sync(x)

    const svgCodes: SvgCodeJson = { svgCodes: [] }

    for (let i = 0; i < files.length; i++) {
        const file: string = files[i]

        const data = readFileSync(file, 'utf8')
        const result = await getSinglePath(data, file)
        svgCodes.svgCodes.push({
            name: getName(file),
            d: result
        })

    }

    console.log(chalk.yellow(JSON.stringify(svgCodes)))
}

parseAll()
