import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(public themeService: ThemeService) {}

  ngOnInit(): void {
    this.onResize();
  }

  ngAfterViewInit(): void {}

  canvasWidth = '300px';
  canvasHeight = '300px';

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 600) {
      this.canvasWidth = '100vw';
      this.canvasWidth = '100vw';
      return;
    }
    this.canvasWidth = '400px';
    this.canvasHeight = '400px';
  }

  people = [
    {
      name: 'Lewis O’Connor',
      role: 'Manager Director',
      img: 'https://pbs.twimg.com/media/FCJeSIRWUAUz0S4?format=jpg',
    },
    {
      name: 'Josh Robertson',
      role: 'Manager Director',
      img: 'https://pbs.twimg.com/media/FCSzR6IXEAMEy96?format=jpg',
    },
    {
      name: 'Sam Grivell',
      role: 'Finance Director',
      img: 'https://pbs.twimg.com/media/FCi-AjDWEAMs-i2?format=jpg',
    },
    {
      name: 'Alim Hussain',
      role: 'Operations Director',
      img: 'https://pbs.twimg.com/media/FCti8keXsAsTDF7?format=jpg',
    },
    {
      name: 'Adham Hayat',
      role: 'Sales Director',
      img: 'https://pbs.twimg.com/media/FCtjiqrXsAUew-u?format=jpg',
    },
    {
      name: 'Brandon Wilson',
      role: 'HR Director',
      img: 'https://pbs.twimg.com/media/FCxiKIcWEAQah_e?format=jpg',
    },
    {
      name: 'Jodie Peebles and Emma Young',
      role: 'Digital Technology Directors',
      img: 'https://pbs.twimg.com/media/FCxin-4WYAQqtqu?format=jpg',
    },
    {
      name: 'Evie ward and Ava McKinlay',
      role: 'Marketing team',
      img: 'https://pbs.twimg.com/media/FC2tvmRWUAAGuaQ?format=jpg',
    },
    {
      name: 'Eve Sullivan',
      role: 'Head Secretary',
      img: 'https://pbs.twimg.com/media/FC2uBxxWYAM0wM-?format=jpg',
    },
    {
      name: 'Erin Gillies',
      role: 'Substainability Director',
      img: 'https://pbs.twimg.com/media/FC2uzkdWQAYsFMe?format=jpg',
    },
    {
      name: 'Isla Hunter',
      role: 'Substainability Director',
      img: 'https://pbs.twimg.com/media/FC2uzkdWEAAIf19?format=jpg',
    },
  ];
}
