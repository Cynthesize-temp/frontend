import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="not-found">
      <img src="../../../assets/not_found.svg" width="500px" />
      <p>
        We looked for it, but couldn't find the page for you. Go back to exploring
        <a routerLink="['']">Cynthesize</a>
      </p>
    </div>
  `,
  styles: [
    `
      .not-found {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 100%;
      }
      .not-found p {
        color: black;
        font-size: 1rem;
        text-align: center;
      }
      @media (max-width: 650px) {
        .not-found img {
          width: 100%;
        }
        .not-found {
          width: 90%;
          margin: 0 auto;
        }
      }
    `
  ]
})
export class NotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
