# Angular Implementation Plan for PetroTrack

## Project Structure Overview

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/
│   │   ├── calculate-cost/
│   │   ├── sidebar/
│   │   ├── trip-card/
│   │   ├── trip-modal/
│   │   └── shared/
│   ├── models/
│   │   ├── trip.model.ts
│   │   └── cost-calculation.model.ts
│   ├── services/
│   │   ├── trip.service.ts
│   │   ├── cost-calculation.service.ts
│   │   └── local-storage.service.ts
│   ├── guards/
│   └── pipes/
├── assets/
└── styles/
```

## Phase 1: Core Setup and Models

### 1.1 Data Models
Create TypeScript interfaces and models for:
- **Trip Model**: id, name, distance, frequency, costPerKm
- **Cost Calculation Model**: fillUpCost, distanceBefore, distanceAfter
- **Dashboard Summary Model**: totalTrips, totalMonthlyCost, etc.

### 1.2 Core Services
- **TripService**: CRUD operations for trips
- **CostCalculationService**: Handle cost per km calculations
- **LocalStorageService**: Data persistence layer

## Phase 2: Layout and Navigation

### 2.1 App Layout
- Main app shell with sidebar navigation
- Responsive layout using CSS Grid/Flexbox
- Route outlet for main content area

### 2.2 Sidebar Component
- Navigation menu
- Current cost per km display
- Consistent across all routes

### 2.3 Routing Setup
```typescript
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'calculate-cost', component: CalculateCostComponent },
  { path: '**', redirectTo: '/dashboard' }
];
```

## Phase 3: Dashboard Implementation

### 3.1 Dashboard Component
- Display trip cards in responsive grid
- Add new trip functionality
- Trip statistics summary

### 3.2 Trip Card Component
- Reusable component for trip display
- Edit/Delete actions
- Monthly cost calculations

### 3.3 Trip Modal Component
- Add/Edit trip form
- Form validation using Angular Reactive Forms
- Modal overlay with backdrop click handling

## Phase 4: Cost Calculation Features

### 4.1 Calculate Cost Component
- Tab-based interface (Calculate vs Manual)
- Automatic calculation form
- Manual cost input form
- Result display and application

### 4.2 Cost Calculation Logic
- Implement fuel efficiency calculations
- Validation for distance calculations
- Real-time cost updates across components

## Phase 5: Data Management and Persistence

### 5.1 Local Storage Integration
- Service for localStorage operations
- Data serialization/deserialization
- Error handling for storage operations

### 5.2 State Management
- Reactive data flow using RxJS
- Subject/BehaviorSubject for real-time updates
- Data synchronization between components

## Phase 6: UI/UX Enhancement

### 6.1 Styling
- Convert existing CSS to Angular component styles
- Implement CSS custom properties for theming
- Responsive design patterns

### 6.2 Animations
- Angular Animations for modal transitions
- Card hover effects
- Loading states

### 6.3 Form Enhancements
- Custom validators
- Error message components
- Auto-save functionality

## Phase 7: Testing and Optimization

### 7.1 Unit Testing
- Service testing with mocked dependencies
- Component testing with TestBed
- Form validation testing

### 7.2 E2E Testing
- User journey testing
- Cross-browser compatibility

### 7.3 Performance Optimization
- OnPush change detection strategy
- Lazy loading if needed
- Bundle optimization

## Implementation Priority

### High Priority (MVP)
1. Trip model and service
2. Dashboard with trip cards
3. Add/Edit trip functionality
4. Basic cost calculation
5. Local storage persistence

### Medium Priority
1. Calculate cost page with tabs
2. Sidebar navigation
3. Responsive design
4. Form validations

### Low Priority (Nice to have)
1. Advanced animations
2. Export functionality
3. Multiple cost calculation methods
4. Trip categories/tags

## Technical Considerations

### Angular Features to Use
- **Reactive Forms**: For all form handling
- **Services with Dependency Injection**: For data management
- **RxJS Observables**: For reactive data flow
- **Angular Router**: For navigation
- **Component Communication**: @Input/@Output and Services
- **Lifecycle Hooks**: OnInit, OnDestroy for cleanup

### CSS Architecture
- Component-scoped styles
- Global styles for layout
- CSS custom properties for theming
- Mobile-first responsive design

### Data Flow Pattern
```
Component → Service → LocalStorage
     ↑           ↓
   Observable ← Subject
```

## Next Steps
1. Set up the basic project structure
2. Create models and interfaces
3. Implement core services
4. Build dashboard component
5. Add routing and navigation
6. Implement trip management features
7. Add cost calculation functionality
8. Style and polish the UI

Would you like me to start implementing any specific part of this plan?
