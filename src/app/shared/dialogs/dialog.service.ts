import { Injectable, ElementRef } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private overlayRef: OverlayRef;

  constructor(private overlay: Overlay) {}

  public openDialog<T>(componentPortal: ComponentPortal<T>, buttonRef: ElementRef): void {
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

  public closeDialog(): void {
    this.overlayRef.dispose();
  }
}
