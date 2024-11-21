import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MealsNutritionalPlanService } from '../../../core/services/meals-nutritional-plan.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

@Component({
    selector: 'app-meal-details',
    standalone: true,
    imports: [CommonModule, RouterLink, NavbarComponent],
    templateUrl: './meal-details.component.html',
    styleUrls: ['./meal-details.component.css']
})
export class MealDetailsComponent implements OnInit {
    mealId!: number;
    mealData: any;
    sanitizedDescription: any;
    media_url: string = 'https://nutri-api-latest.onrender.com/api/v1/media/';
    constructor(
        private route: ActivatedRoute,
        private mealsService: MealsNutritionalPlanService,
        private sanitizer: DomSanitizer
    ) {}

    ngOnInit() {
        this.mealId = +this.route.snapshot.paramMap.get('id')!;
        console.log('Meal ID from route:', this.mealId);
        this.fetchMealData(this.mealId);
    }

    fetchMealData(id: number) {
        this.mealsService.getMealById(id).subscribe(
            (data) => {
                this.mealData = data;
                console.log('Meal data fetched:', this.mealData);

                // Sanitize and parse the description for HTML
                this.sanitizedDescription = this.sanitizer.bypassSecurityTrustHtml(this.parseDescription(this.mealData.description));
            },
            (error) => {
                console.error('Error fetching meal data:', error);
            }
        );
    }

    parseDescription(description: string): string {
        const lines = description.split('\n');
        let formattedHtml = '';

        lines.forEach(line => {
            if (line.startsWith('## ')) {
                // Subtitle
                const subtitle = line.replace('## ', '').trim();
                formattedHtml += `<h4 style="font-family:inherit;font-size:28px;font-weight:600;margin:15px 0 0 -25px;">${subtitle}</h4>`;
            } else if (line.startsWith('- ')) {
                // List item
                const listItem = line.replace('- ', '').trim();
                formattedHtml += `<li>${listItem}</li>`;
            } else if (line.trim().length > 0) {
                // Regular text
                formattedHtml += `<p style="margin: 15px 0 0 0">${line.trim()}</p>`;
            }
        });

        return `<ul>${formattedHtml}</ul>`; // Wrap everything in a <ul>
    }
}
