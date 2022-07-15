import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowFormComponent } from './show-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
	declarations: [ShowFormComponent],
	imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
	exports: [ShowFormComponent],
})
export class ShowFormModule {}