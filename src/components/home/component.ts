import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";

@Component({
    selector: 'home',
    template: require('./template.html'),
    styles: [require('./style.less')],
    directives: [ROUTER_DIRECTIVES]
})

export class HomeComponent  {
    constructor()   {
        
    }
}