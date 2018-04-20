"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BranchComponent = (function () {
    function BranchComponent() {
    }
    BranchComponent.prototype.ngOnInit = function () {
    };
    BranchComponent = __decorate([
        core_1.Component({
            selector: 'branch-component',
            templateUrl: '../../../templates/dashboard/setting/branch.template.html',
        }),
        __metadata("design:paramtypes", [])
    ], BranchComponent);
    return BranchComponent;
}());
exports.BranchComponent = BranchComponent;
//# sourceMappingURL=branch.component.js.map