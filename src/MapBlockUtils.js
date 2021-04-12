import * as _0x2db075 from 'three';
import { Point } from './point';
import {
    vg,
    tundra,
    ice,
    sea,
    sand,
    grassland,
    hills,
    mountain
} from './VG';
var size = 0xa;
var EXTRUSION_FACTOR = size / 0x4b;
var tileheight = size * 0x2;
var tilevert = tileheight * 0x3 / 0x4;
var tilewidth = Math['sqrt'](0x3) / 0x2 * tileheight;
var blocksize = size / 0x64;
var blockheight = blocksize * 0x2;
var blockvert = blockheight * 0x3 / 0x4;
var blockwidth = Math['sqrt'](0x3) / 0x2 * blockheight;
var blockextrude = blocksize;
var GRASSLAND_COLOR = 0x1b9100;
var MOUNTAINS_COLOR = 0x7b736a;
var HILLS_COLOR = 0xbaac80;
var WATER_COLOR = 0x4873ff;
var TUNDRA_COLOR = 0xc9c9c9;
var ICE_COLOR = 0x58ceff;
var SAND_COLOR = 0xffe1b5;
var SEA_LEVEL = 0x7d;
var SAND_LEVEL = 0x87;
var GRASSLAND_LEVEL = 0xaa;
var HILLS_LEVEL = 0xc8;
var TUNDRA_PERCENTAGE = 0.08;
var ICE_PERCENTAGE = 0.04;
var offset = 0x0;
var whathappened = 0x0;
var colors = [
    '000000',
    '000033',
    '000066',
    '000099',
    '0000CC',
    '0000FF',
    '003300',
    '003333',
    '003366',
    '003399',
    '0033CC',
    '0033FF',
    '006600',
    '006633',
    '006666',
    '006699',
    '0066CC',
    '0066FF',
    '009900',
    '009933',
    '009966',
    '009999',
    '0099CC',
    '0099FF',
    '00CC00',
    '00CC33',
    '00CC66',
    '00CC99',
    '00CCCC',
    '00CCFF',
    '00FF00',
    '00FF33',
    '00FF66',
    '00FF99',
    '00FFCC',
    '00FFFF',
    '330000',
    '330033',
    '330066',
    '330099',
    '3300CC',
    '3300FF',
    '333300',
    '333333',
    '333366',
    '333399',
    '3333CC',
    '3333FF',
    '336600',
    '336633',
    '336666',
    '336699',
    '3366CC',
    '3366FF',
    '339900',
    '339933',
    '339966',
    '339999',
    '3399CC',
    '3399FF',
    '33CC00',
    '33CC33',
    '33CC66',
    '33CC99',
    '33CCCC',
    '33CCFF',
    '33FF00',
    '33FF33',
    '33FF66',
    '33FF99',
    '33FFCC',
    '33FFFF',
    '660000',
    '660033',
    '660066',
    '660099',
    '6600CC',
    '6600FF',
    '663300',
    '663333',
    '663366',
    '663399',
    '6633CC',
    '6633FF',
    '666600',
    '666633',
    '666666',
    '666699',
    '6666CC',
    '6666FF',
    '669900',
    '669933',
    '669966',
    '669999',
    '6699CC',
    '6699FF',
    '66CC00',
    '66CC33',
    '66CC66',
    '66CC99',
    '66CCCC',
    '66CCFF',
    '66FF00',
    '66FF33',
    '66FF66',
    '66FF99',
    '66FFCC',
    '66FFFF',
    '990000',
    '990033',
    '990066',
    '990099',
    '9900CC',
    '9900FF',
    '993300',
    '993333',
    '993366',
    '993399',
    '9933CC',
    '9933FF',
    '996600',
    '996633',
    '996666',
    '996699',
    '9966CC',
    '9966FF',
    '999900',
    '999933',
    '999966',
    '999999',
    '9999CC',
    '9999FF',
    '99CC00',
    '99CC33',
    '99CC66',
    '99CC99',
    '99CCCC',
    '99CCFF',
    '99FF00',
    '99FF33',
    '99FF66',
    '99FF99',
    '99FFCC',
    '99FFFF',
    'CC0000',
    'CC0033',
    'CC0066',
    'CC0099',
    'CC00CC',
    'CC00FF',
    'CC3300',
    'CC3333',
    'CC3366',
    'CC3399',
    'CC33CC',
    'CC33FF',
    'CC6600',
    'CC6633',
    'CC6666',
    'CC6699',
    'CC66CC',
    'CC66FF',
    'CC9900',
    'CC9933',
    'CC9966',
    'CC9999',
    'CC99CC',
    'CC99FF',
    'CCCC00',
    'CCCC33',
    'CCCC66',
    'CCCC99',
    'CCCCCC',
    'CCCCFF',
    'CCFF00',
    'CCFF33',
    'CCFF66',
    'CCFF99',
    'CCFFCC',
    'CCFFFF',
    'FF0000',
    'FF0033',
    'FF0066',
    'FF0099',
    'FF00CC',
    'FF00FF',
    'FF3300',
    'FF3333',
    'FF3366',
    'FF3399',
    'FF33CC',
    'FF33FF',
    'FF6600',
    'FF6633',
    'FF6666',
    'FF6699',
    'FF66CC',
    'FF66FF',
    'FF9900',
    'FF9933',
    'FF9966',
    'FF9999',
    'FF99CC',
    'FF99FF',
    'FFCC00',
    'FFCC33',
    'FFCC66',
    'FFCC99',
    'FFCCCC',
    'FFCCFF',
    'FFFF00',
    'FFFF33',
    'FFFF66',
    'FFFF99',
    'FFFFCC',
    'FFFFFF'
];
var blockdefs = [
    {
        'which': 0x0,
        'description': 'column',
        'occupies': [
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x1,
            0x0,
            0x0,
            0x2,
            0x0,
            0x0,
            0x3,
            0x0,
            0x0,
            0x4,
            0x0,
            0x0,
            0x5,
            0x0,
            0x0,
            0x6,
            0x0,
            0x0,
            0x7
        ],
        'attachesto': [
            0x0,
            0x0,
            -0x1,
            0x0,
            0x0,
            0x8,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0
        ]
    },
    {
        'which': 0x1,
        'description': 'W-E\x20horizontal\x20beam',
        'occupies': [
            0x0,
            0x0,
            0x0,
            0x1,
            0x0,
            0x0,
            0x2,
            0x0,
            0x0,
            0x3,
            0x0,
            0x0,
            0x4,
            0x0,
            0x0,
            0x5,
            0x0,
            0x0,
            0x6,
            0x0,
            0x0,
            0x7,
            0x0,
            0x0
        ],
        'attachesto': [
            0x0,
            0x0,
            -0x1,
            0x1,
            0x0,
            -0x1,
            0x2,
            0x0,
            -0x1,
            0x3,
            0x0,
            -0x1,
            0x4,
            0x0,
            -0x1,
            0x5,
            0x0,
            -0x1,
            0x6,
            0x0,
            -0x1,
            0x7,
            0x0,
            -0x1,
            0x0,
            0x0,
            0x1,
            0x1,
            0x0,
            0x1,
            0x2,
            0x0,
            0x1,
            0x3,
            0x0,
            0x1,
            0x4,
            0x0,
            0x1,
            0x5,
            0x0,
            0x1,
            0x6,
            0x0,
            0x1,
            0x7,
            0x0,
            0x1
        ]
    },
    {
        'which': 0x2,
        'description': 'SW-NE\x20diagonal\x20snake',
        'occupies': [
            0x0,
            0x0,
            0x0,
            0x1,
            0x0,
            0x0,
            0x1,
            0x1,
            0x0,
            0x2,
            0x1,
            0x0,
            0x3,
            0x2,
            0x0,
            0x4,
            0x2,
            0x0,
            0x4,
            0x3,
            0x0,
            0x5,
            0x3,
            0x0
        ],
        'attachesto': [
            0x0,
            0x0,
            -0x1,
            0x1,
            0x0,
            -0x1,
            0x1,
            0x1,
            -0x1,
            0x2,
            0x1,
            -0x1,
            0x3,
            0x2,
            -0x1,
            0x4,
            0x2,
            -0x1,
            0x4,
            0x3,
            -0x1,
            0x5,
            0x3,
            -0x1,
            0x0,
            0x0,
            0x1,
            0x1,
            0x0,
            0x1,
            0x1,
            0x1,
            0x1,
            0x2,
            0x1,
            0x1,
            0x3,
            0x2,
            0x1,
            0x4,
            0x2,
            0x1,
            0x4,
            0x3,
            0x1,
            0x5,
            0x3,
            0x1
        ]
    },
    {
        'which': 0x3,
        'description': 'SE-NW\x20diagonal\x20snake',
        'occupies': [
            0x0,
            0x0,
            0x0,
            -0x1,
            0x0,
            0x0,
            -0x2,
            0x1,
            0x0,
            -0x3,
            0x1,
            0x0,
            -0x3,
            0x2,
            0x0,
            -0x4,
            0x2,
            0x0,
            -0x5,
            0x3,
            0x0,
            -0x6,
            0x3,
            0x0
        ],
        'attachesto': [
            0x0,
            0x0,
            -0x1,
            -0x1,
            0x0,
            -0x1,
            -0x2,
            0x1,
            -0x1,
            -0x3,
            0x1,
            -0x1,
            -0x3,
            0x2,
            -0x1,
            -0x4,
            0x2,
            -0x1,
            -0x5,
            0x3,
            -0x1,
            -0x6,
            0x3,
            -0x1,
            0x0,
            0x0,
            0x1,
            -0x1,
            0x0,
            0x1,
            -0x2,
            0x1,
            0x1,
            -0x3,
            0x1,
            0x1,
            -0x3,
            0x2,
            0x1,
            -0x4,
            0x2,
            0x1,
            -0x5,
            0x3,
            0x1,
            -0x6,
            0x3,
            0x1
        ]
    },
    {
        'which': 0x4,
        'description': 'W-E\x20quadruple-decker',
        'occupies': [
            0x0,
            0x0,
            0x0,
            0x1,
            0x0,
            0x0,
            0x0,
            0x0,
            0x1,
            0x1,
            0x0,
            0x1,
            0x0,
            0x0,
            0x2,
            0x1,
            0x0,
            0x2,
            0x0,
            0x0,
            0x3,
            0x1,
            0x0,
            0x3
        ],
        'attachesto': [
            0x0,
            0x0,
            -0x1,
            0x1,
            0x0,
            -0x1,
            0x0,
            0x0,
            0x4,
            0x1,
            0x0,
            0x4,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0
        ]
    },
    {
        'which': 0x5,
        'description': 'SW-NE\x20quadruple-decker',
        'occupies': [
            0x0,
            0x0,
            0x0,
            0x0,
            0x1,
            0x0,
            0x0,
            0x0,
            0x1,
            0x0,
            0x1,
            0x1,
            0x0,
            0x0,
            0x2,
            0x0,
            0x1,
            0x2,
            0x0,
            0x0,
            0x3,
            0x0,
            0x1,
            0x3
        ],
        'attachesto': [
            0x0,
            0x0,
            -0x1,
            0x0,
            0x1,
            -0x1,
            0x0,
            0x0,
            0x4,
            0x0,
            0x1,
            0x4,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0
        ]
    },
    {
        'which': 0x6,
        'description': 'SE-NW\x20quadruple-decker',
        'occupies': [
            0x0,
            0x0,
            0x0,
            -0x1,
            0x1,
            0x0,
            0x0,
            0x0,
            0x1,
            -0x1,
            0x1,
            0x1,
            0x0,
            0x0,
            0x2,
            -0x1,
            0x1,
            0x2,
            0x0,
            0x0,
            0x3,
            -0x1,
            0x1,
            0x3
        ],
        'attachesto': [
            0x0,
            0x0,
            -0x1,
            -0x1,
            0x1,
            -0x1,
            0x0,
            0x0,
            0x4,
            -0x1,
            0x1,
            0x4,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0
        ]
    },
    {
        'which': 0x7,
        'description': 'W-E\x20double-decker',
        'occupies': [
            0x0,
            0x0,
            0x0,
            0x1,
            0x0,
            0x0,
            0x2,
            0x0,
            0x0,
            0x3,
            0x0,
            0x0,
            0x0,
            0x0,
            0x1,
            0x1,
            0x0,
            0x1,
            0x2,
            0x0,
            0x1,
            0x3,
            0x0,
            0x1
        ],
        'attachesto': [
            0x0,
            0x0,
            -0x1,
            0x1,
            0x0,
            -0x1,
            0x2,
            0x0,
            -0x1,
            0x3,
            0x0,
            -0x1,
            0x0,
            0x0,
            0x2,
            0x1,
            0x0,
            0x2,
            0x2,
            0x0,
            0x2,
            0x3,
            0x0,
            0x2,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0
        ]
    },
    {
        'which': 0x8,
        'description': 'SW-NE\x20double-decker\x20diagonal\x20snake',
        'occupies': [
            0x0,
            0x0,
            0x0,
            0x1,
            0x0,
            0x0,
            0x1,
            0x1,
            0x0,
            0x2,
            0x1,
            0x0,
            0x0,
            0x0,
            0x1,
            0x1,
            0x0,
            0x1,
            0x1,
            0x1,
            0x1,
            0x2,
            0x1,
            0x1
        ],
        'attachesto': [
            0x0,
            0x0,
            -0x1,
            0x1,
            0x0,
            -0x1,
            0x1,
            0x1,
            -0x1,
            0x2,
            0x1,
            -0x1,
            0x0,
            0x0,
            0x2,
            0x1,
            0x0,
            0x2,
            0x1,
            0x1,
            0x2,
            0x2,
            0x1,
            0x2,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0
        ]
    },
    {
        'which': 0x9,
        'description': 'SE-NW\x20double-decker\x20diagonal\x20snake',
        'occupies': [
            0x0,
            0x0,
            0x0,
            -0x1,
            0x0,
            0x0,
            -0x2,
            0x1,
            0x0,
            -0x3,
            0x1,
            0x0,
            0x0,
            0x0,
            0x1,
            -0x1,
            0x0,
            0x1,
            -0x2,
            0x1,
            0x1,
            -0x3,
            0x1,
            0x1
        ],
        'attachesto': [
            0x0,
            0x0,
            -0x1,
            -0x1,
            0x0,
            -0x1,
            -0x2,
            0x1,
            -0x1,
            -0x3,
            0x1,
            -0x1,
            0x0,
            0x0,
            0x2,
            -0x1,
            0x0,
            0x2,
            -0x2,
            0x1,
            0x2,
            -0x3,
            0x1,
            0x2,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0
        ]
    },
    {
        'which': 0xa,
        'description': 'S-N\x20snake',
        'occupies': [
            0x0,
            0x0,
            0x0,
            0x0,
            0x1,
            0x0,
            0x0,
            0x2,
            0x0,
            0x0,
            0x3,
            0x0,
            0x0,
            0x4,
            0x0,
            0x0,
            0x5,
            0x0,
            0x0,
            0x6,
            0x0,
            0x0,
            0x7,
            0x0
        ],
        'attachesto': [
            0x0,
            0x0,
            -0x1,
            0x0,
            0x1,
            -0x1,
            0x0,
            0x2,
            -0x1,
            0x0,
            0x3,
            -0x1,
            0x0,
            0x4,
            -0x1,
            0x0,
            0x5,
            -0x1,
            0x0,
            0x6,
            -0x1,
            0x0,
            0x7,
            -0x1,
            0x0,
            0x0,
            0x1,
            0x0,
            0x1,
            0x1,
            0x0,
            0x2,
            0x1,
            0x0,
            0x3,
            0x1,
            0x0,
            0x4,
            0x1,
            0x0,
            0x5,
            0x1,
            0x0,
            0x6,
            0x1,
            0x0,
            0x7,
            0x1
        ]
    },
    {
        'which': 0xb,
        'description': 'S-N\x20snake\x20flipped',
        'occupies': [
            0x0,
            0x0,
            0x0,
            -0x1,
            0x1,
            0x0,
            0x0,
            0x2,
            0x0,
            -0x1,
            0x3,
            0x0,
            0x0,
            0x4,
            0x0,
            -0x1,
            0x5,
            0x0,
            0x0,
            0x6,
            0x0,
            -0x1,
            0x7,
            0x0
        ],
        'attachesto': [
            0x0,
            0x0,
            -0x1,
            -0x1,
            0x1,
            -0x1,
            0x0,
            0x2,
            -0x1,
            -0x1,
            0x3,
            -0x1,
            0x0,
            0x4,
            -0x1,
            -0x1,
            0x5,
            -0x1,
            0x0,
            0x6,
            -0x1,
            -0x1,
            0x7,
            -0x1,
            0x0,
            0x0,
            0x1,
            -0x1,
            0x1,
            0x1,
            0x0,
            0x2,
            0x1,
            -0x1,
            0x3,
            0x1,
            0x0,
            0x4,
            0x1,
            -0x1,
            0x5,
            0x1,
            0x0,
            0x6,
            0x1,
            -0x1,
            0x7,
            0x1
        ]
    },
    {
        'which': 0xc,
        'description': 'S-N\x20double-decker\x20snake',
        'occupies': [
            0x0,
            0x0,
            0x0,
            0x0,
            0x1,
            0x0,
            0x0,
            0x2,
            0x0,
            0x0,
            0x3,
            0x0,
            0x0,
            0x0,
            0x1,
            0x0,
            0x1,
            0x1,
            0x0,
            0x2,
            0x1,
            0x0,
            0x3,
            0x1
        ],
        'attachesto': [
            0x0,
            0x0,
            -0x1,
            0x0,
            0x1,
            -0x1,
            0x0,
            0x2,
            -0x1,
            0x0,
            0x3,
            -0x1,
            0x0,
            0x0,
            0x2,
            0x0,
            0x1,
            0x2,
            0x0,
            0x2,
            0x2,
            0x0,
            0x3,
            0x2,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0
        ]
    },
    {
        'which': 0xd,
        'description': 'S-N\x20double-decker\x20snake\x20flipped',
        'occupies': [
            0x0,
            0x0,
            0x0,
            -0x1,
            0x1,
            0x0,
            0x0,
            0x2,
            0x0,
            -0x1,
            0x3,
            0x0,
            0x0,
            0x0,
            0x1,
            -0x1,
            0x1,
            0x1,
            0x0,
            0x2,
            0x1,
            -0x1,
            0x3,
            0x1
        ],
        'attachesto': [
            0x0,
            0x0,
            -0x1,
            -0x1,
            0x1,
            -0x1,
            0x0,
            0x2,
            -0x1,
            -0x1,
            0x3,
            -0x1,
            0x0,
            0x0,
            0x2,
            -0x1,
            0x1,
            0x2,
            0x0,
            0x2,
            0x2,
            -0x1,
            0x3,
            0x1,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0
        ]
    },
    {
        'which': 0xe,
        'description': 'W-E\x20stairstep',
        'occupies': [
            0x0,
            0x0,
            0x0,
            0x1,
            0x0,
            0x0,
            0x1,
            0x0,
            0x1,
            0x2,
            0x0,
            0x1,
            0x2,
            0x0,
            0x2,
            0x3,
            0x0,
            0x2,
            0x3,
            0x0,
            0x3,
            0x4,
            0x0,
            0x3
        ],
        'attachesto': [
            0x0,
            0x0,
            -0x1,
            0x1,
            0x0,
            -0x1,
            0x2,
            0x0,
            0x0,
            0x3,
            0x0,
            0x1,
            0x4,
            0x0,
            0x2,
            0x0,
            0x0,
            0x1,
            0x1,
            0x0,
            0x2,
            0x2,
            0x0,
            0x3,
            0x3,
            0x0,
            0x4,
            0x4,
            0x0,
            0x4,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0
        ]
    },
    {
        'which': 0xf,
        'description': 'E-W\x20stairstep',
        'occupies': [
            0x0,
            0x0,
            0x0,
            -0x1,
            0x0,
            0x0,
            -0x1,
            0x0,
            0x1,
            -0x2,
            0x0,
            0x1,
            -0x2,
            0x0,
            0x2,
            -0x3,
            0x0,
            0x2,
            -0x3,
            0x0,
            0x3,
            -0x4,
            0x0,
            0x3
        ],
        'attachesto': [
            0x0,
            0x0,
            -0x1,
            -0x1,
            0x0,
            -0x1,
            -0x2,
            0x0,
            0x0,
            -0x3,
            0x0,
            0x1,
            -0x4,
            0x0,
            0x2,
            0x0,
            0x0,
            0x1,
            -0x1,
            0x0,
            0x2,
            -0x2,
            0x0,
            0x3,
            -0x3,
            0x0,
            0x4,
            -0x4,
            0x0,
            0x4,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0
        ]
    },
    {
        'which': 0x10,
        'description': 'N-S\x20stairstep',
        'occupies': [
            0x0,
            0x0,
            0x0,
            0x0,
            -0x1,
            0x0,
            0x0,
            -0x1,
            0x1,
            0x0,
            -0x2,
            0x1,
            0x0,
            -0x2,
            0x2,
            0x0,
            -0x3,
            0x2,
            0x0,
            -0x3,
            0x3,
            0x0,
            -0x4,
            0x3
        ],
        'attachesto': [
            0x0,
            0x0,
            -0x1,
            0x0,
            -0x1,
            -0x1,
            0x0,
            -0x2,
            0x0,
            0x0,
            -0x3,
            0x1,
            0x0,
            -0x4,
            0x2,
            0x0,
            0x0,
            0x1,
            0x0,
            -0x1,
            0x2,
            0x0,
            -0x2,
            0x3,
            0x0,
            -0x3,
            0x4,
            0x0,
            -0x4,
            0x4,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0
        ]
    },
    {
        'which': 0x11,
        'description': 'S-N\x20stairstep',
        'occupies': [
            0x0,
            0x0,
            0x0,
            0x0,
            0x1,
            0x0,
            0x0,
            0x1,
            0x1,
            0x0,
            0x2,
            0x1,
            0x0,
            0x2,
            0x2,
            0x0,
            0x3,
            0x2,
            0x0,
            0x3,
            0x3,
            0x0,
            0x4,
            0x3
        ],
        'attachesto': [
            0x0,
            0x0,
            -0x1,
            0x0,
            0x1,
            -0x1,
            0x0,
            0x2,
            0x0,
            0x0,
            0x3,
            0x1,
            0x0,
            0x4,
            0x2,
            0x0,
            0x0,
            0x1,
            0x0,
            0x1,
            0x2,
            0x0,
            0x2,
            0x3,
            0x0,
            0x3,
            0x4,
            0x0,
            0x4,
            0x4,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0,
            0x0
        ]
    }
];
var tundratexture = tundra;
var icetexture = ice;
var watertexture = sea;
var grasslandtexture = grassland;
var sandtexture = sand;
var hillstexture = hills;
var mountainstexture = mountain;
var texture;
function RGBtoHSV(_0x3d3537, _0x1d6545, _0x19c4c5) {
    if (arguments['length'] === 0x1) {
        _0x1d6545 = _0x3d3537['g'], _0x19c4c5 = _0x3d3537['b'], _0x3d3537 = _0x3d3537['r'];
    }
    var _0x5e42c4 = Math['max'](_0x3d3537, _0x1d6545, _0x19c4c5), _0x4d4038 = Math['min'](_0x3d3537, _0x1d6545, _0x19c4c5), _0x12fbe5 = _0x5e42c4 - _0x4d4038, _0x121e6e, _0x4598dd = _0x5e42c4 === 0x0 ? 0x0 : _0x12fbe5 / _0x5e42c4, _0x109198 = _0x5e42c4 / 0xff;
    switch (_0x5e42c4) {
    case _0x4d4038:
        _0x121e6e = 0x0;
        break;
    case _0x3d3537:
        _0x121e6e = _0x1d6545 - _0x19c4c5 + _0x12fbe5 * (_0x1d6545 < _0x19c4c5 ? 0x6 : 0x0);
        _0x121e6e /= 0x6 * _0x12fbe5;
        break;
    case _0x1d6545:
        _0x121e6e = _0x19c4c5 - _0x3d3537 + _0x12fbe5 * 0x2;
        _0x121e6e /= 0x6 * _0x12fbe5;
        break;
    case _0x19c4c5:
        _0x121e6e = _0x3d3537 - _0x1d6545 + _0x12fbe5 * 0x4;
        _0x121e6e /= 0x6 * _0x12fbe5;
        break;
    }
    return {
        'h': _0x121e6e,
        's': _0x4598dd,
        'v': _0x109198
    };
}
function HSVtoHSL(_0x3ceb06, _0xaa3489, _0x10978b) {
    if (arguments['length'] === 0x1) {
        _0xaa3489 = _0x3ceb06['s'], _0x10978b = _0x3ceb06['v'], _0x3ceb06 = _0x3ceb06['h'];
    }
    var _0x41e482 = _0x3ceb06, _0xf567b2 = _0xaa3489 * _0x10978b, _0x565286 = (0x2 - _0xaa3489) * _0x10978b;
    _0xf567b2 /= _0x565286 <= 0x1 ? _0x565286 : 0x2 - _0x565286;
    _0x565286 /= 0x2;
    return {
        'h': _0x41e482,
        's': _0xf567b2,
        'l': _0x565286
    };
}
function HSLtoHSV(_0xcd5ac5, _0x297f94, _0x4e68fa) {
    if (arguments['length'] === 0x1) {
        _0x297f94 = _0xcd5ac5['s'], _0x4e68fa = _0xcd5ac5['l'], _0xcd5ac5 = _0xcd5ac5['h'];
    }
    var _0x239e92 = _0xcd5ac5, _0x40c4a5, _0x156350;
    _0x4e68fa *= 0x2;
    _0x297f94 *= _0x4e68fa <= 0x1 ? _0x4e68fa : 0x2 - _0x4e68fa;
    _0x156350 = (_0x4e68fa + _0x297f94) / 0x2;
    _0x40c4a5 = 0x2 * _0x297f94 / (_0x4e68fa + _0x297f94);
    return {
        'h': _0x239e92,
        's': _0x40c4a5,
        'v': _0x156350
    };
}
function HSVtoRGB(_0x1ed772, _0x3adff4, _0x264c0a) {
    var _0x4114bd, _0x1b994b, _0x382ebe, _0x2969b5, _0xda1d34, _0x3851bd, _0x4b01d9, _0x1596ad;
    if (arguments['length'] === 0x1) {
        _0x3adff4 = _0x1ed772['s'], _0x264c0a = _0x1ed772['v'], _0x1ed772 = _0x1ed772['h'];
    }
    _0x2969b5 = Math['floor'](_0x1ed772 * 0x6);
    _0xda1d34 = _0x1ed772 * 0x6 - _0x2969b5;
    _0x3851bd = _0x264c0a * (0x1 - _0x3adff4);
    _0x4b01d9 = _0x264c0a * (0x1 - _0xda1d34 * _0x3adff4);
    _0x1596ad = _0x264c0a * (0x1 - (0x1 - _0xda1d34) * _0x3adff4);
    switch (_0x2969b5 % 0x6) {
    case 0x0:
        _0x4114bd = _0x264c0a, _0x1b994b = _0x1596ad, _0x382ebe = _0x3851bd;
        break;
    case 0x1:
        _0x4114bd = _0x4b01d9, _0x1b994b = _0x264c0a, _0x382ebe = _0x3851bd;
        break;
    case 0x2:
        _0x4114bd = _0x3851bd, _0x1b994b = _0x264c0a, _0x382ebe = _0x1596ad;
        break;
    case 0x3:
        _0x4114bd = _0x3851bd, _0x1b994b = _0x4b01d9, _0x382ebe = _0x264c0a;
        break;
    case 0x4:
        _0x4114bd = _0x1596ad, _0x1b994b = _0x3851bd, _0x382ebe = _0x264c0a;
        break;
    case 0x5:
        _0x4114bd = _0x264c0a, _0x1b994b = _0x3851bd, _0x382ebe = _0x4b01d9;
        break;
    }
    return {
        'r': Math['round'](_0x4114bd * 0xff),
        'g': Math['round'](_0x1b994b * 0xff),
        'b': Math['round'](_0x382ebe * 0xff)
    };
}
function darkenColor(_0x445b78, _0x39df0c) {
    var _0x34ed24 = {
        'r': (_0x445b78 & 0xff0000) >> 0x10,
        'g': (_0x445b78 & 0xff00) >> 0x8,
        'b': _0x445b78 & 0xff
    };
    var _0x3907ce = RGBtoHSV(_0x34ed24['r'], _0x34ed24['g'], _0x34ed24['b']);
    var _0x2ea56e = HSVtoHSL(_0x3907ce['h'], _0x3907ce['s'], _0x3907ce['v']);
    _0x2ea56e['l'] = _0x2ea56e['l'] * _0x39df0c;
    if (_0x2ea56e['l'] === 0x0)
        _0x445b78 = 0x0;
    else {
        _0x3907ce = HSLtoHSV(_0x2ea56e['h'], _0x2ea56e['s'], _0x2ea56e['l']);
        var _0x276eb8 = HSVtoRGB(_0x3907ce['h'], _0x3907ce['s'], _0x3907ce['v']);
        _0x445b78 = _0x276eb8['r'] * Math['pow'](0x10, 0x4) + _0x276eb8['g'] * Math['pow'](0x10, 0x2) + _0x276eb8['b'];
    }
    return _0x445b78;
}
class BlockUtils {
    constructor(_0x2c9cd7, _0x55c52b, _0x4f0792) {
        this['tiles'] = _0x55c52b;
        this['scene'] = _0x2c9cd7;
        this['mapsize'] = _0x4f0792;
        this['hextexprime'] = _0x2db075['ImageUtils']['loadTexture']('images/concrete.jpg');
        this['hextexes'] = [];
        var _0x1d2de5;
        for (var _0x52855f = 0x0; _0x52855f < blockdefs['length']; _0x52855f++) {
            _0x1d2de5 = _0x2db075['ImageUtils']['loadTexture']('images/concrete' + _0x52855f + '.jpg');
            this['hextexes']['push'](_0x1d2de5);
        }
    }
    ['drawMap'](_0x9bbd39, _0xf114da) {
        var _0x4345f3 = null;
        var _0x382ccc = '';
        var _0x40776e = _0x9bbd39 * this['mapsize'] + _0xf114da;
        if (this['tiles']['length'] === 0x1) {
            _0x4345f3 = GRASSLAND_COLOR;
            texture = grasslandtexture;
            _0x382ccc = 'grassland';
        } else if (this['tiles'][_0x40776e]['elevation'] >= SEA_LEVEL && (_0xf114da < TUNDRA_PERCENTAGE * this['mapsize'] || _0xf114da > (0x1 - TUNDRA_PERCENTAGE) * (this['mapsize'] - 0x1))) {
            _0x4345f3 = TUNDRA_COLOR;
            texture = tundratexture;
            _0x382ccc = 'tundra';
            if (_0xf114da < ICE_PERCENTAGE * this['mapsize'] || _0xf114da > (0x1 - ICE_PERCENTAGE) * (this['mapsize'] - 0x1)) {
                _0x4345f3 = ICE_COLOR;
                texture = icetexture;
                _0x382ccc = 'ice';
            }
        } else if (this['tiles'][_0x40776e]['elevation'] < SEA_LEVEL) {
            _0x4345f3 = WATER_COLOR;
            texture = watertexture;
            _0x382ccc = 'water';
        } else if (this['tiles'][_0x40776e]['elevation'] < SAND_LEVEL) {
            _0x4345f3 = SAND_COLOR;
            texture = sandtexture;
            _0x382ccc = 'sand';
        } else if (this['tiles'][_0x40776e]['elevation'] < GRASSLAND_LEVEL) {
            _0x4345f3 = GRASSLAND_COLOR;
            texture = grasslandtexture;
            _0x382ccc = 'grassland';
        } else if (this['tiles'][_0x40776e]['elevation'] < HILLS_LEVEL) {
            _0x4345f3 = HILLS_COLOR;
            texture = hillstexture;
            _0x382ccc = 'hills';
        } else if (this['tiles'][_0x40776e]['elevation'] <= 0x100) {
            if (this['tiles'][_0x40776e]['elevation'] > 0xff) {
                console['log']('WARNING\x20elevationg\x20greater\x20than\x20255');
            }
            _0x4345f3 = MOUNTAINS_COLOR;
            texture = mountainstexture;
            _0x382ccc = 'mountains';
        }
        if (_0x4345f3 !== SAND_COLOR) {
            var _0x4c668b = {
                'r': (_0x4345f3 & 0xff0000) >> 0x10,
                'g': (_0x4345f3 & 0xff00) >> 0x8,
                'b': _0x4345f3 & 0xff
            };
            var _0x9d1049 = RGBtoHSV(_0x4c668b['r'], _0x4c668b['g'], _0x4c668b['b']);
            var _0x37afb7 = HSVtoHSL(_0x9d1049['h'], _0x9d1049['s'], _0x9d1049['v']);
            _0x37afb7['l'] = _0x37afb7['l'] * ((0xff - this['tiles'][_0x40776e]['elevation']) * 0x2 / 0x5 + this['tiles'][_0x40776e]['elevation']) / 0xff;
            if (_0x37afb7['l'] === 0x0)
                _0x4345f3 = 0x0;
            else {
                _0x9d1049 = HSLtoHSV(_0x37afb7['h'], _0x37afb7['s'], _0x37afb7['l']);
                var _0x450eac = HSVtoRGB(_0x9d1049['h'], _0x9d1049['s'], _0x9d1049['v']);
                _0x4345f3 = _0x450eac['r'] * Math['pow'](0x10, 0x4) + _0x450eac['g'] * Math['pow'](0x10, 0x2) + _0x450eac['b'];
            }
        }
        var _0x50f53a = (_0x9bbd39 - (this['mapsize'] - 0x1) / 0x2) * tilewidth;
        if (_0xf114da % 0x2 !== 0x0)
            _0x50f53a = _0x50f53a + tilewidth / 0x2;
        var _0x48999d = (_0xf114da - (this['mapsize'] - 0x1) / 0x2) * tilevert;
        var _0x3885ad;
        if (this['tiles']['length'] === 0x1)
            _0x3885ad = 0x1;
        else if (this['tiles'][_0x40776e]['elevation'] < SEA_LEVEL)
            _0x3885ad = SEA_LEVEL * EXTRUSION_FACTOR;
        else
            _0x3885ad = this['tiles'][_0x40776e]['elevation'] * EXTRUSION_FACTOR;
        var _0xff030 = {
            'amount': _0x3885ad,
            'steps': 0x1,
            'material': 0x1,
            'extrudeMaterial': 0x0,
            'bevelEnabled': ![]
        };
        var _0x377713 = new _0x2db075['MeshPhongMaterial']({
            'color': _0x4345f3,
            'map': texture
        });
        texture['wrapS'] = texture['wrapT'] = _0x2db075['RepeatWrapping'];
        texture['repeat']['set'](0.1, 0.1);
        var _0x1fb686 = new _0x2db075['Shape']();
        var _0x3304b0 = new Point(_0x50f53a, _0x48999d);
        var _0x308bfd = this['cornerHex'](_0x3304b0, size, 0x0);
        var _0xf04623 = this['cornerHex'](_0x3304b0, size, 0x1);
        var _0x17ea90 = this['cornerHex'](_0x3304b0, size, 0x2);
        var _0x33b95 = this['cornerHex'](_0x3304b0, size, 0x3);
        var _0x301a9c = this['cornerHex'](_0x3304b0, size, 0x4);
        var _0x3654ee = this['cornerHex'](_0x3304b0, size, 0x5);
        _0x1fb686['moveTo'](_0x308bfd['x'], _0x308bfd['y']);
        _0x1fb686['lineTo'](_0xf04623['x'], _0xf04623['y']);
        _0x1fb686['lineTo'](_0x17ea90['x'], _0x17ea90['y']);
        _0x1fb686['lineTo'](_0x33b95['x'], _0x33b95['y']);
        _0x1fb686['lineTo'](_0x301a9c['x'], _0x301a9c['y']);
        _0x1fb686['lineTo'](_0x3654ee['x'], _0x3654ee['y']);
        _0x1fb686['lineTo'](_0x308bfd['x'], _0x308bfd['y']);
        var _0x42bad2 = new _0x2db075['ExtrudeGeometry'](_0x1fb686, _0xff030);
        var _0x4e8e84 = new _0x2db075['Mesh'](_0x42bad2, _0x377713);
        _0x4e8e84['userData']['elevation'] = this['tiles'][_0x40776e]['elevation'];
        _0x4e8e84['userData']['tiletype'] = _0x382ccc;
        _0x4e8e84['userData']['col'] = _0x9bbd39;
        _0x4e8e84['userData']['row'] = _0xf114da;
        _0x4e8e84['userData']['owner'] = this['tiles'][_0x40776e]['owner'];
        _0x4e8e84['userData']['name'] = this['tiles'][_0x40776e]['name'];
        _0x4e8e84['userData']['status'] = this['tiles'][_0x40776e]['status'];
        this['scene']['add'](_0x4e8e84);
        return;
    }
    ['cornerHex'](_0x293f90, _0x1dc41a, _0x5f1296) {
        var _0x4d6e2 = 0x3c * _0x5f1296 + 0x1e;
        var _0x17ef97 = Math['PI'] / 0xb4 * _0x4d6e2;
        return new Point(_0x293f90['x'] + _0x1dc41a * Math['cos'](_0x17ef97), _0x293f90['y'] + _0x1dc41a * Math['sin'](_0x17ef97));
    }
    ['drawBlock'](_0x7925eb, _0x3523fe, _0x30e936, _0x19b54f, _0x496343, _0x1897eb, _0x30066b, _0x4f5bdd, _0x20201f, _0x41be59, _0x2e5842, _0x29e14e) {
        console['log']('drawBlock\x20' + _0x7925eb + ',' + _0x3523fe + '\x20which=' + _0x30e936 + '\x20x=' + _0x19b54f + '\x20y=' + _0x496343 + '\x20z=' + _0x1897eb + '\x20color=' + _0x30066b);
        var _0x407e09 = (_0x7925eb - (this['mapsize'] - 0x1) / 0x2) * tilewidth;
        if (_0x3523fe % 0x2 !== 0x0)
            _0x407e09 = _0x407e09 + tilewidth / 0x2;
        var _0x178010 = (_0x3523fe - (this['mapsize'] - 0x1) / 0x2) * tilevert;
        _0x407e09 = _0x407e09 + _0x19b54f * blockwidth;
        if (_0x496343 % 0x2 !== 0x0)
            _0x407e09 = _0x407e09 + blockwidth / 0x2;
        _0x178010 = _0x178010 + _0x496343 * blockvert;
        var _0x1ccae2 = {
            'amount': blockextrude,
            'steps': 0x1,
            'material': 0x1,
            'extrudeMaterial': 0x0,
            'bevelEnabled': ![]
        };
        var _0x1f4da5;
        var _0x516d21;
        if (typeof _0x516d21 !== 'undefined' && _0x516d21 !== null)
            _0x1f4da5 = this['hextexes'][_0x30e936];
        else
            _0x1f4da5 = this['hextexprime'];
        var _0x25dda1 = parseInt('0x' + colors[_0x30066b + 0x80]);
        var _0x13ecf0 = new _0x2db075['MeshPhongMaterial']({
            'color': _0x25dda1,
            'map': _0x1f4da5
        });
        _0x1f4da5['wrapS'] = _0x1f4da5['wrapT'] = _0x2db075['RepeatWrapping'];
        _0x1f4da5['repeat']['set'](0x3, 0x3);
        var _0x4e79ee = new _0x2db075['Shape']();
        var _0x5b0caf = new Point(_0x407e09, _0x178010);
        var _0x364be6 = [];
        _0x364be6['push'](this['cornerHex'](_0x5b0caf, blocksize, 0x0));
        _0x364be6['push'](this['cornerHex'](_0x5b0caf, blocksize, 0x1));
        _0x364be6['push'](this['cornerHex'](_0x5b0caf, blocksize, 0x2));
        _0x364be6['push'](this['cornerHex'](_0x5b0caf, blocksize, 0x3));
        _0x364be6['push'](this['cornerHex'](_0x5b0caf, blocksize, 0x4));
        _0x364be6['push'](this['cornerHex'](_0x5b0caf, blocksize, 0x5));
        for (var _0x4d043b = 0x0; _0x4d043b < _0x364be6['length']; _0x4d043b++) {
            if (_0x4d043b === 0x0)
                _0x4e79ee['moveTo'](_0x364be6[_0x4d043b]['x'], _0x364be6[_0x4d043b]['y']);
            else
                _0x4e79ee['lineTo'](_0x364be6[_0x4d043b]['x'], _0x364be6[_0x4d043b]['y']);
        }
        _0x4e79ee['moveTo'](_0x364be6[0x0]['x'], _0x364be6[0x0]['y']);
        var _0x391c73 = new _0x2db075['ExtrudeGeometry'](_0x4e79ee, _0x1ccae2);
        var _0x440b15 = new _0x2db075['Mesh'](_0x391c73, _0x13ecf0);
        var _0x4ecdb5;
        var _0x2e581d = _0x7925eb * this['mapsize'] + _0x3523fe;
        if (this['tiles'][_0x2e581d]['elevation'] < SEA_LEVEL) {
            _0x4ecdb5 = SEA_LEVEL * EXTRUSION_FACTOR;
        } else {
            _0x4ecdb5 = this['tiles'][_0x2e581d]['elevation'] * EXTRUSION_FACTOR;
        }
        if (this['tiles']['length'] === 0x1)
            _0x440b15['position']['set'](0x0, 0x0, 0x1 + _0x1897eb * blockextrude);
        else
            _0x440b15['position']['set'](0x0, 0x0, _0x4ecdb5 + _0x1897eb * blockextrude);
        _0x440b15['userData']['which'] = _0x30e936;
        _0x440b15['userData']['x'] = _0x19b54f;
        _0x440b15['userData']['y'] = _0x496343;
        _0x440b15['userData']['z'] = _0x1897eb;
        _0x440b15['userData']['keyx'] = _0x41be59;
        _0x440b15['userData']['keyy'] = _0x2e5842;
        _0x440b15['userData']['keyz'] = _0x29e14e;
        _0x440b15['userData']['blockindex'] = _0x4f5bdd;
        _0x440b15['userData']['sequencenum'] = _0x20201f;
        _0x440b15['userData']['description'] = blockdefs[_0x30e936]['description'];
        _0x440b15['userData']['color'] = _0x30066b;
        var _0x6ea8e7 = [];
        var _0x3ec732 = [];
        for (var _0x55a25c = 0x0; _0x55a25c < 0x18; _0x55a25c += 0x3) {
            _0x3ec732 = [];
            _0x3ec732['push'](blockdefs[_0x30e936]['occupies'][_0x55a25c]);
            _0x3ec732['push'](blockdefs[_0x30e936]['occupies'][_0x55a25c + 0x1]);
            _0x3ec732['push'](blockdefs[_0x30e936]['occupies'][_0x55a25c + 0x2]);
            _0x6ea8e7['push'](_0x3ec732);
        }
        _0x440b15['userData']['occupies'] = _0x6ea8e7;
        this['scene']['add'](_0x440b15);
    }
    ['writeBlock'](_0x4d03ac, _0x39192a, _0xc9758c, _0x477d6a) {
        var _0x354952 = new Array(0x18);
        var _0x5af56b = new Array(0x18);
        for (var _0x2ca88b = 0x0; _0x2ca88b < 0x18; _0x2ca88b++) {
            _0x354952[_0x2ca88b] = blockdefs[_0x477d6a[0x0]]['occupies'][_0x2ca88b];
            _0x5af56b[_0x2ca88b] = blockdefs[_0x477d6a[0x0]]['occupies'][_0x2ca88b];
        }
        var _0x1035e6 = _0x4d03ac * this['mapsize'] + _0x39192a;
        var _0x4d9ba2 = this['tiles'][_0x1035e6];
        _0x2ca88b = 0x0;
        for (_0x2ca88b = 0x0; _0x2ca88b < 0x18; _0x2ca88b += 0x3) {
            _0x354952[_0x2ca88b] = _0x354952[_0x2ca88b] + _0x477d6a[0x1];
            _0x354952[_0x2ca88b + 0x1] = _0x354952[_0x2ca88b + 0x1] + _0x477d6a[0x2];
            if (_0x354952[0x1] % 0x2 != 0x0 && _0x354952[_0x2ca88b + 0x1] % 0x2 == 0x0)
                _0x354952[_0x2ca88b] = _0x354952[_0x2ca88b] + 0x1;
            _0x354952[_0x2ca88b + 0x2] = _0x354952[_0x2ca88b + 0x2] + _0x477d6a[0x3];
            _0x5af56b[_0x2ca88b] = _0x5af56b[_0x2ca88b] + _0x4d9ba2['blocks'][_0xc9758c][0x1];
            _0x5af56b[_0x2ca88b + 0x1] = _0x5af56b[_0x2ca88b + 0x1] + _0x4d9ba2['blocks'][_0xc9758c][0x2];
            if (_0x5af56b[0x1] % 0x2 != 0x0 && _0x5af56b[_0x2ca88b + 0x1] % 0x2 == 0x0)
                _0x5af56b[_0x2ca88b] = _0x5af56b[_0x2ca88b] + 0x1;
            _0x5af56b[_0x2ca88b + 0x2] = _0x5af56b[_0x2ca88b + 0x2] + _0x4d9ba2['blocks'][_0xc9758c][0x3];
        }
        var _0x520675 = 0x0, _0xe9915d = 0x0, _0x265a66 = 0x0;
        for (var _0x3fe254 = 0x0; _0x3fe254 < 0x18; _0x3fe254 += 0x3) {
            if (_0x3fe254 === 0x0) {
                _0x520675 = _0x354952[_0x3fe254];
                _0xe9915d = _0x354952[_0x3fe254 + 0x1];
                _0x265a66 = _0x354952[_0x3fe254 + 0x2];
            }
            var _0x5783e8;
            if (_0x3fe254 === 0x0 && (typeof _0x5783e8 !== 'undefined' && _0x5783e8 !== null && _0x5783e8 === !![]))
                this['drawBlock'](_0x4d03ac, _0x39192a, _0x477d6a[0x0], _0x354952[_0x3fe254], _0x354952[_0x3fe254 + 0x1], _0x354952[_0x3fe254 + 0x2], 0x57, _0xc9758c, _0x3fe254 / 0x3, _0x520675, _0xe9915d, _0x265a66);
            else
                this['drawBlock'](_0x4d03ac, _0x39192a, _0x477d6a[0x0], _0x354952[_0x3fe254], _0x354952[_0x3fe254 + 0x1], _0x354952[_0x3fe254 + 0x2], _0x477d6a[0x4], _0xc9758c, _0x3fe254 / 0x3, _0x520675, _0xe9915d, _0x265a66);
        }
        if (_0x4d9ba2['blocks'][_0xc9758c][0x3] >= 0x0) {
            for (var _0x4b2445 = 0x0; _0x4b2445 < 0x18; _0x4b2445 += 0x3) {
                if (_0x4d9ba2['occupado']) {
                    for (var _0x2a923d = 0x0; _0x2a923d < _0x4d9ba2['occupado']['length']; _0x2a923d++) {
                        if (_0x5af56b[_0x4b2445] == _0x4d9ba2['occupado'][_0x2a923d][0x0] && _0x5af56b[_0x4b2445 + 0x1] == _0x4d9ba2['occupado'][_0x2a923d][0x1] && _0x5af56b[_0x4b2445 + 0x2] == _0x4d9ba2['occupado'][_0x2a923d][0x2]) {
                            _0x4d9ba2['occupado'][_0x2a923d][0x0] = _0x354952[_0x4b2445];
                            _0x4d9ba2['occupado'][_0x2a923d][0x1] = _0x354952[_0x4b2445 + 0x1];
                            _0x4d9ba2['occupado'][_0x2a923d][0x2] = _0x354952[_0x4b2445 + 0x2];
                        }
                    }
                }
            }
        } else {
            var _0x4de00b = [];
            for (var _0x5b6270 = 0x0; _0x5b6270 < 0x18; _0x5b6270 += 0x3) {
                _0x4de00b = new Array(0x3);
                _0x4de00b[0x0] = _0x354952[_0x5b6270];
                _0x4de00b[0x1] = _0x354952[_0x5b6270 + 0x1];
                _0x4de00b[0x2] = _0x354952[_0x5b6270 + 0x2];
                _0x4d9ba2['occupado']['push'](_0x4de00b);
            }
        }
        _0x4d9ba2['blocks'][_0xc9758c] = _0x477d6a;
    }
    ['validHexCoords'](_0xea14cf, _0x2d410d) {
        var _0x23c764 = Math['abs'](_0xea14cf);
        var _0x1fb9b0 = Math['abs'](_0x2d410d);
        if (_0x1fb9b0 <= 0x21) {
            if (_0x2d410d % 0x2 != 0x0) {
                if (-0x32 <= _0xea14cf && _0xea14cf <= 0x31)
                    return !![];
            } else {
                if (_0x23c764 <= 0x31)
                    return !![];
            }
        } else {
            if (_0x2d410d >= 0x0 && _0xea14cf >= 0x0 || _0x2d410d < 0x0 && _0xea14cf > 0x0) {
                if (_0x2d410d % 0x2 != 0x0) {
                    if (_0x23c764 * 0x2 + _0x1fb9b0 * 0x3 <= 0xc6) {
                        console['log']('1st\x20or\x204th,\x20y\x20odd,\x20<=\x20198');
                        return !![];
                    } else {
                        console['log']('1st\x20or\x204th,\x20y\x20odd,\x20>\x20198,\x20returning\x20false');
                    }
                } else {
                    if ((_0x23c764 + 0x1) * 0x2 + (_0x1fb9b0 - 0x1) * 0x3 <= 0xc6) {
                        console['log']('1st\x20or\x204th,\x20y\x20even,\x20<=\x20198');
                        return !![];
                    } else {
                        console['log']('1st\x20or\x204th,\x20y\x20even,\x20>\x20198');
                    }
                }
            } else {
                if (_0x2d410d % 0x2 == 0x0) {
                    if (_0x23c764 * 0x2 + _0x1fb9b0 * 0x3 <= 0xc6) {
                        console['log']('2nd\x20or\x2043rd,\x20y\x20even,\x20<=\x20198');
                        return !![];
                    } else {
                        console['log']('2nd\x20or\x2043rd,\x20y\x20even,\x20>\x20198');
                    }
                } else {
                    if ((_0x23c764 + 0x1) * 0x2 + (_0x1fb9b0 - 0x1) * 0x3 <= 0xc6) {
                        console['log']('2nd\x20or\x2043rd,\x20y\x20odd,\x20<=\x20198');
                        return !![];
                    } else {
                        console['log']('2nd\x20or\x2043rd,\x20y\x20odd,\x20>\x20198');
                    }
                }
            }
        }
    }
    ['isValidLocation'](_0xb7ee3, _0x124076, _0xe2ffbc, _0x53e62f) {
        var _0x29cf2b = ![];
        var _0x555be5 = _0xb7ee3 * this['mapsize'] + _0x124076;
        var _0x5ed614 = this['tiles'][_0x555be5];
        for (var _0x4a649c = 0x0; _0x4a649c < 0x18; _0x4a649c += 0x3) {
            if (!this['validHexCoords'](_0x53e62f[_0x4a649c], _0x53e62f[_0x4a649c + 0x1])) {
                console['log']('10:writeBlock:ERR:OOB');
                return ![];
            }
            console['log']('checking\x20wouldoccupy\x20x,y,z\x20against\x20tile.occupado\x20for\x20' + _0x53e62f[_0x4a649c] + ',' + _0x53e62f[_0x4a649c + 0x1] + ',' + _0x53e62f[_0x4a649c + 0x2]);
            console['log'](JSON['stringify'](_0x5ed614['occupado']));
            if (_0x5ed614['occupado']) {
                for (var _0x213422 = 0x0; _0x213422 < _0x5ed614['occupado']['length']; _0x213422++) {
                    if (_0x53e62f[_0x4a649c] == _0x5ed614['occupado'][_0x213422][0x0] && _0x53e62f[_0x4a649c + 0x1] == _0x5ed614['occupado'][_0x213422][0x1] && _0x53e62f[_0x4a649c + 0x2] == _0x5ed614['occupado'][_0x213422][0x2]) {
                        whathappened = 0xb;
                        return ![];
                    }
                }
            }
            if (_0x29cf2b == ![] && _0x53e62f[_0x4a649c + 0x2] == 0x0) {
                _0x29cf2b = !![];
            }
        }
        if (_0x29cf2b == ![]) {
            console['log']('inside\x20touches==false');
            var _0x507335 = new Array(0x30);
            for (var _0x35631e = 0x0; _0x35631e < 0x30; _0x35631e++) {
                _0x507335[_0x35631e] = blockdefs[_0xe2ffbc[0x0]]['attachesto'][_0x35631e];
            }
            for (var _0x258533 = 0x0; _0x258533 < 0x30 && !_0x29cf2b; _0x258533 += 0x3) {
                if (_0x507335[_0x258533] == 0x0 && _0x507335[_0x258533 + 0x1] == 0x0 && _0x507335[_0x258533 + 0x2] == 0x0)
                    break;
                _0x507335[_0x258533 + 0x1] = _0x507335[_0x258533 + 0x1] + _0xe2ffbc[0x2];
                if (_0x507335[0x1] % 0x2 != 0x0 && _0x507335[_0x258533 + 0x1] % 0x2 == 0x0)
                    _0x507335[_0x258533] = _0x507335[_0x258533] + 0x1;
                if (_0x5ed614['occupado']) {
                    for (_0x213422 = 0x0; _0x213422 < _0x5ed614['occupado']['length'] && !_0x29cf2b; _0x213422++) {
                        if (_0x507335[_0x258533] + _0xe2ffbc[0x1] == _0x5ed614['occupado'][_0x213422][0x0] && _0x507335[_0x258533 + 0x1] == _0x5ed614['occupado'][_0x213422][0x1] && _0x507335[_0x258533 + 0x2] + _0xe2ffbc[0x3] == _0x5ed614['occupado'][_0x213422][0x2]) {
                            whathappened = 0xc;
                            console['log']('touches');
                            return !![];
                        }
                    }
                }
            }
            whathappened = 0xd;
            console['log']('no\x20touch');
            return ![];
        } else {
            whathappened = 0xe;
            console['log']('touches\x20ground');
            return !![];
        }
    }
}
export default BlockUtils;
