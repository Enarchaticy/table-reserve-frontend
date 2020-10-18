import { Injectable, ElementRef } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private overlayRef: OverlayRef;
  public reservationChange: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private overlay: Overlay) {}

  public openUserMenuDialog<T>(componentPortal: ComponentPortal<T>, buttonRef: ElementRef): void {
    this.overlayRef = this.overlay.create({
      width: 165,
      height: 193,
      hasBackdrop: true,
      positionStrategy: this.overlay
        .position()
        .connectedTo(buttonRef, { originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'top' }),
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });
    this.overlayRef.attach(componentPortal);
    this.overlayRef.backdropClick().subscribe(() => this.closeDialog());
  }

  public openReservationDialog<T>(componentPortal: ComponentPortal<T>, svgCanvasRef: ElementRef): void {
    this.overlayRef = this.overlay.create({
      width: 279,
      height: 192,
      hasBackdrop: true,
      positionStrategy: this.overlay
        .position()
        .connectedTo(
          svgCanvasRef,
          { originX: 'center', originY: 'center' },
          { overlayX: 'center', overlayY: 'center' }
        ),
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });
    this.overlayRef.attach(componentPortal);
    this.overlayRef.backdropClick().subscribe(() => this.closeDialog());
  }

  public openDeleteProfileDialog<T>(componentPortal: ComponentPortal<T>): void {
    this.overlayRef = this.overlay.create({
      width: 279,
      height: 300,
      hasBackdrop: true,
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });
    this.overlayRef.attach(componentPortal);
    this.overlayRef.backdropClick().subscribe(() => this.closeDialog());
  }

  public closeDialog(message?: boolean): void {
    if (message) {
      this.reservationChange.next(message);
    }
    this.overlayRef.dispose();
  }
}
