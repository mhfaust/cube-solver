import { GridModel } from "../store/cubeSlice"

const isSolved = (grid: GridModel) => solvedStates.has(serialize(grid))

export default isSolved

export const serialize = (grid: GridModel) => grid.flat(3)
  .map(cube => cube.intialPosition.join(''))
  .join('')

const solvedStates = new Set(
  [
    '000001002010011012020021022100101102110111112120121122200201202210211212220221222',
    '000010020100110120200210220001011021101111121201211221002012022102112122202212222',
    '000100200001101201002102202010110210011111211012112212020120220021121221022122222',
    '002001000102101100202201200012011010112111110212211210022021020122121120222221220',
    '002012022001011021000010020102112122101111121100110120202212222201211221200210220',
    '002102202012112212022122222001101201011111211021121221000100200010110210020120220',
    '020010000021011001022012002120110100121111101122112102220210200221211201222212202',
    '020021022120121122220221222010011012110111112210211212000001002100101102200201202',
    '020120220010110210000100200021121221011111211001101201022122222012112212002102202',
    '022012002122112102222212202021011001121111101221211201020010000120110100220210200',
    '022021020012011010002001000122121120112111110102101100222221220212211210202201200',
    '022122222021121221020120220012112212011111211010110210002102202001101201000100200',
    '200100000210110010220120020201101001211111011221121021202102002212112012222122022',
    '200201202100101102000001002210211212110111112010011012220221222120121122020021022',
    '200210220201211221202212222100110120101111121102112122000010020001011021002012022',
    '202102002201101001200100000212112012211111011210110010222122022221121021220120020',
    '202201200212211210222221220102101100112111110122121120002001000012011010022021020',
    '202212222102112122002012022201211221101111121001011021200210220100110120000010020',
    '220120020221121021222122022210110010211111011212112012200100000201101001202102002',
    '220210200120110100020010000221211201121111101021011001222212202122112102022012002',
    '220221222210211212200201202120121122110111112100101102020021022010011012000001002',
    '222122022212112012202102002221121021211111011201101001220120020210110010200100000',
    '222212202221211201220210200122112102121111101120110100022012002021011001020010000',
    '222221220122121120022021020212211210112111110012011010202201200102101100002001000',
  ]
)