import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";

@Component({
    selector: 'about',
    template: require('./template.html'),
    styles: [require('./style.less')],
    directives: [ROUTER_DIRECTIVES]
})

export class AboutComponent  {
    constructor()   {
        
    }
}