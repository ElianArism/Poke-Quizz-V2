import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  // private camera!: Camera;
  // private scene!: Scene;
  // private renderer!: WebGLRenderer;
  // private pokeball!: Group;
  // private animationLoop: number = 0;

  // @ViewChild('pokeballContainer')
  // private pokeballContainer!: ElementRef<HTMLDivElement>;

  constructor() {
    //   this.renderer = new WebGLRenderer();
    //   this.renderer.outputColorSpace = SRGBColorSpace;
    //   this.scene = new Scene();
  }

  ngAfterViewInit(): void {
    // this.initScene();
  }

  // initScene(): void {
  //   const container = this.pokeballContainer.nativeElement;
  //   this.renderer.setSize(container.clientWidth, container.clientHeight);
  //   container.appendChild(this.renderer.domElement);
  //   this.camera = new PerspectiveCamera(
  //     75,
  //     this.pokeballContainer.nativeElement.clientWidth /
  //       this.pokeballContainer.nativeElement.clientHeight
  //   );
  //   this.loadPokeball();
  // }

  // loadPokeball(): void {
  //   const loader = new FBXLoader();
  //   // const loader = new OBJLoader();
  //   // loader.load('assets/3d/Pokeball.obj', (object) => {
  //   loader.load('assets/3d/Pokeball.fbx', (object) => {
  //     this.scene.background = new Color(100, 100, 100);
  //     this.pokeball = object as Group;

  //     this.scene.add(this.pokeball);

  //     this.camera.position.z = 50;

  //     // const dirLight = new DirectionalLight(0xefefff, 1.5);
  //     // dirLight.position.set(10, 10, 10);
  //     // const light = new PointLight(0x0f0f0f, 1);

  //     // this.scene.add(light);

  //     this.animate(); // Start the animation loop
  //   });
  // }

  // animate(): void {
  //   this.animationLoop += 1;

  //   // Rotate the pokeball
  //   if (this.pokeball) {
  //     this.pokeball.rotation.x += 0.01;
  //     this.pokeball.rotation.y += 0.01;
  //   }

  //   this.renderer.render(this.scene, this.camera);

  //   // Request the next frame
  //   requestAnimationFrame(() => this.animate());
  // }
}
