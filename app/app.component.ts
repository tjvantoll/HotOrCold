import {Component} from "angular2/core";
import {topmost} from "ui/frame";
import {Color} from "color";
var mapbox = require("nativescript-mapbox");

@Component({
    selector: "my-app",
    template: `
<StackLayout>
    <Button text="Hot or Cold?" (tap)="getWeather()"></Button>
    <Label [text]="temperature"></Label>
</StackLayout>
`
})
export class AppComponent {
    public temperature: string;

    constructor() {
        mapbox.show({
            accessToken: "pk.eyJ1IjoidGp2YW50b2xsIiwiYSI6ImNpaHdjN2RwcDAyam50NWtoaXpscGJidnMifQ.R1s89uuLt3BKNHytLasOiw",
            style: mapbox.MapStyle.EMERALD,
            margins: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 300
            },
            showUserLocation: false,
            hideAttribution: true,
            hideLogo: true,
            hideCompass: true
        });
    }

    getWeather() {
        mapbox.getCenter().then((result) => {
            fetch("https://api.forecast.io/forecast/" +
                "c9002942b156fa5d0583934e2b1eced8" +
                "/" + result.lat + "," + result.lng)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    this.temperature = data.currently.temperature > 50 ? "HOT!" : "COLD!";
                    
                    // TODO: Make this dynamic
                    topmost().currentPage.backgroundColor = new Color("green");
                });
        });
    }
}