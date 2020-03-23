import { Component, OnDestroy, ViewChild, ViewContainerRef, ComponentFactoryResolver, Injector, SimpleChange } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { QuizService } from './quiz.service';

// https://github.com/kreuzerk/city-quiz

@Component({
  selector: 'ang-quiz-loader',
  templateUrl: './quiz-loader.component.html',
  styleUrls: ['./quiz-loader.component.scss']
})
export class QuizLoaderComponent implements OnDestroy {
  @ViewChild('quizContainer', { read: ViewContainerRef }) quizContainer: ViewContainerRef;
  quizStarted = false;
  private destroy$ = new Subject();

  constructor(private quizservice: QuizService, private cfr: ComponentFactoryResolver, private injector: Injector) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async showNewQuestion() {
    this.lazyLoadQuizCard();
  }

  async startQuiz() {
    await this.lazyLoadQuizCard();
    this.quizStarted = true;
  }

  private async lazyLoadQuizCard() {
    const { QuizCardComponent } = await import('./quiz-card/quiz-card.component');
    const quizCardFactory = this.cfr.resolveComponentFactory(QuizCardComponent);
    const { instance } = this.quizContainer.createComponent(quizCardFactory, null, this.injector);
    instance.question = this.quizservice.getNextQuestion();
    instance.questionAnswered.pipe(
      takeUntil(instance.destroy$)
    ).subscribe(() => this.showNewQuestion());
    (instance as any).ngOnChanges({
      question: new SimpleChange(null, instance.question, true)
    });
  }
}
