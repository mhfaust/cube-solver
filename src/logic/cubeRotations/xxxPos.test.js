"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var xxxPos_1 = require("./xxxPos");
var cubeUtils_1 = require("../cubeUtils");
var newCube_1 = require("../newCube");
describe('xxxPos', function () {
    it('rotates a 3-cube in the x-positive direction correctly', function () {
        var initial = (0, newCube_1.default)();
        var rotated = (0, xxxPos_1.default)(initial);
        (0, chai_1.expect)(rotated.top).to.deep.equal((0, cubeUtils_1.face180)('back', initial));
        (0, chai_1.expect)(rotated.back).to.deep.equal((0, cubeUtils_1.face180)('bottom', initial));
        (0, chai_1.expect)(rotated.bottom).to.deep.equal(initial.front);
        (0, chai_1.expect)(rotated.front).to.deep.equal(initial.top);
        (0, chai_1.expect)(rotated.left).to.deep.equal((0, cubeUtils_1.faceClockwise)('left', initial));
        (0, chai_1.expect)(rotated.right).to.deep.equal((0, cubeUtils_1.faceCounterClockwise)('right', initial));
    });
});
