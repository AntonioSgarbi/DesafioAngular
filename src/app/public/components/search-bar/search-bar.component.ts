import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Evento} from "../../../types/evento.type";

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchBarComponent),
      multi: true
    }
  ],
})
export class SearchBarComponent implements OnInit, AfterViewInit {
  @Input('model') model!: string;

  @Input('placeholder') placeholder!: string;
  @Output('onSelect') onSelect = new EventEmitter<any>();

  private readonly formGroup: FormGroup;
  private objectList?: Array<any>;

  filteredList?: Array<any>;

  private _valueSelected: any;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.formGroup = this.fb.group({
      name: ['']
    });

  }

  ngOnInit(): void {
    this.formGroup.addControl(this.model, new FormControl());
  }

  ngAfterViewInit(): void {
    this.http.get<any[]>(`${environment.api}/${this.model}/all`).subscribe({
      next: res => {
        this.objectList = res;
        this.filteredList = res;
      }
    })
  }

  get loadList(): Array<any> {
    return this.objectList!;
  }

  set loadList(value: Array<any>) {
    this.objectList = value;
  }

  get form(): FormGroup {
    return this.formGroup;
  }

  get getValueSelected(): any {
    return this._valueSelected ?? '';
  }

  setValueSelected(value: any | null) {
    this.formGroup.get(this.model)!.setValue(value);
    this._valueSelected = value;
  }

  writeValue(obj: any): void {
    this.form.get(this.model)!.setValue(obj);
    this._valueSelected = obj;
  }

  textChange(text: string) {
    if (text?.length > 1) {
      this.filteredList = this.objectList?.filter((x) => {
        return x.nome.toLowerCase().includes(text.toLowerCase());
      });
    } else {
      this.filteredList = this.objectList;
    }
  }

  displayFn(item: any): string {
    // return this._valueSelected ? this._valueSelected.nome : '';
    return item ? item.nome : '';
  }

  optionSelect(element: any): void {
    this.onSelect.emit(element);
    this._valueSelected = element;
  }

  valueFromInput(): string {
    return this._valueSelected?.name ?? '';
  }

  dropSelectedValue(): void {
    this.onSelect.emit(null);
    this._valueSelected = null;
  }

  isObjectNotNull(): boolean {
    return this._valueSelected != null;
  }

}
