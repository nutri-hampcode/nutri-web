import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from '../../../../core/services/exercise.service';
import { Exercise, Tip} from '../../../../shared/models/exercise.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-exercise-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exercise-tip-show.component.html',
  styleUrls: ['./exercise-tip-show.component.css']
})
export class ExerciseDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private exerciseService = inject(ExerciseService);
  private sanitizer = inject(DomSanitizer);

  exercise!: Exercise;
  videoUrl!: SafeResourceUrl;
  loading = true;
  error = '';

  ngOnInit(): void {
    this.loadExercise();
  }

  loadExercise(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.exerciseService.getExerciseById(Number(id)).subscribe({
        next: (data) => {
          this.exercise = data;
          this.videoUrl = this.getSafeEmbedUrl(this.exercise.linkVideo);
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error al cargar el ejercicio.';
          this.loading = false;
          console.error(err);
        }
      });
    }
  }
  
  getSafeEmbedUrl(link: string): SafeResourceUrl {
    const videoId = link.split('v=')[1];
    const ampersandPosition = videoId.indexOf('&');
    const cleanVideoId =
      ampersandPosition !== -1 ? videoId.substring(0, ampersandPosition) : videoId;
    const embedUrl = `https://www.youtube.com/embed/${cleanVideoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  getEmbedUrl(link: string): string {
    const videoId = link.split('v=')[1];
    const ampersandPosition = videoId.indexOf('&');
    return ampersandPosition !== -1
      ? `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`
      : `https://www.youtube.com/embed/${videoId}`;
  }
  
}
