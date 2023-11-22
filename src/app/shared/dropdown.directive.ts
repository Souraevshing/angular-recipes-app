import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

//adding Directive decorator to use as a custom directive
@Directive({ selector: '[toggleDropdown]' })
export class Dropdown {
  constructor(private elementRef: ElementRef) {}

  //HostBinding is used to update the host element of the directive if it changes, here is `isOpen` is false,
  //then the class will be removed and added when true.
  @HostBinding('class.open') isOpen: boolean = false;

  //HostListener listens to click event and if host emits events, then it invokes the handler function
  @HostListener('click', ['$event']) toggle(event: Event) {
    this.isOpen = !this.isOpen;
    event.stopPropagation();
  }

  //adding click listener to whole document and listen to click event and if clicked anywhere elst, then it closes the dropdown
  @HostListener('document:click', ['$event']) closeDropdown(event: Event) {
    //close dropdown for current target i.e. `header` or `recipe-details`
    if (!this.elementRef.nativeElement.contains(event.target)) {
      // Close the dropdown if the click is outside the dropdown
      this.isOpen = false;
    }
  }
}
