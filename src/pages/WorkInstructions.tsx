import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Navigation from '@/components/dashboard/Navigation';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  CheckCircle, 
  AlertTriangle, 
  Video, 
  FileText,
  Clock,
  User,
  Settings
} from 'lucide-react';

interface WorkStep {
  id: string;
  title: string;
  description: string;
  duration: number;
  type: 'safety' | 'operation' | 'inspection' | 'maintenance';
  media?: {
    type: 'video' | 'image' | 'document';
    url: string;
    thumbnail: string;
  };
  tools: string[];
  warnings?: string[];
  checkpoints: string[];
}

interface WorkInstruction {
  id: string;
  title: string;
  category: 'maintenance' | 'operation' | 'safety' | 'quality';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  requiredSkills: string[];
  description: string;
  steps: WorkStep[];
}

const WorkInstructions = () => {
  const [selectedInstruction, setSelectedInstruction] = useState<WorkInstruction | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isPlaying, setIsPlaying] = useState(false);

  const workInstructions: WorkInstruction[] = [
    {
      id: 'inst-001',
      title: 'Hydraulic Press Maintenance',
      category: 'maintenance',
      difficulty: 'intermediate',
      estimatedTime: 45,
      requiredSkills: ['Hydraulics', 'Safety Procedures', 'Mechanical Systems'],
      description: 'Complete maintenance procedure for hydraulic press systems including safety checks and component inspection.',
      steps: [
        {
          id: 'step-001',
          title: 'Safety Lockout/Tagout',
          description: 'Ensure all power sources are isolated and locked out before beginning maintenance work.',
          duration: 5,
          type: 'safety',
          media: {
            type: 'video',
            url: '/maintenance-videos/lockout.mp4',
            thumbnail: '/lovable-uploads/040dcaec-ee9e-42b9-a3f0-5f1475f922ff.png'
          },
          tools: ['Lockout Kit', 'Multi-meter', 'Safety Tags'],
          warnings: ['Never bypass safety interlocks', 'Verify zero energy state'],
          checkpoints: ['All power sources locked', 'Energy dissipated', 'Tags applied']
        },
        {
          id: 'step-002',
          title: 'Hydraulic Fluid Inspection',
          description: 'Check hydraulic fluid levels, color, and contamination. Replace if necessary.',
          duration: 10,
          type: 'inspection',
          media: {
            type: 'image',
            url: '/maintenance-images/fluid-check.jpg',
            thumbnail: '/lovable-uploads/1bf7ef2a-98ac-4641-a6bc-ec0436837364.png'
          },
          tools: ['Dipstick', 'Sample Container', 'Fluid Analysis Kit'],
          checkpoints: ['Fluid level normal', 'Color acceptable', 'No contamination detected']
        },
        {
          id: 'step-003',
          title: 'Pressure System Check',
          description: 'Test system pressure and check for leaks in hydraulic lines and connections.',
          duration: 15,
          type: 'operation',
          media: {
            type: 'video',
            url: '/maintenance-videos/pressure-test.mp4',
            thumbnail: '/lovable-uploads/4a2070c3-c5b3-45a0-b1fb-01e92110975e.png'
          },
          tools: ['Pressure Gauge', 'Leak Detection Spray', 'Torque Wrench'],
          warnings: ['System under high pressure', 'Wear safety glasses'],
          checkpoints: ['Pressure within spec', 'No visible leaks', 'Connections tight']
        },
        {
          id: 'step-004',
          title: 'Component Lubrication',
          description: 'Apply proper lubrication to all moving parts and components as per maintenance schedule.',
          duration: 10,
          type: 'maintenance',
          media: {
            type: 'document',
            url: '/maintenance-docs/lubrication-chart.pdf',
            thumbnail: '/lovable-uploads/643dfa10-7c57-4617-8a5f-27b53c32c9a9.png'
          },
          tools: ['Grease Gun', 'Lubricants', 'Cleaning Rags'],
          checkpoints: ['All points lubricated', 'Excess grease removed', 'Equipment clean']
        },
        {
          id: 'step-005',
          title: 'Final Safety Check',
          description: 'Remove lockout devices, restore power, and perform operational test.',
          duration: 5,
          type: 'safety',
          tools: ['Keys', 'Operational Checklist'],
          warnings: ['Ensure area is clear', 'Follow startup procedure'],
          checkpoints: ['All personnel clear', 'Lockout removed', 'System operational']
        }
      ]
    },
    {
      id: 'inst-002',
      title: 'Conveyor Belt Setup',
      category: 'operation',
      difficulty: 'beginner',
      estimatedTime: 30,
      requiredSkills: ['Basic Mechanics', 'Safety Awareness'],
      description: 'Step-by-step procedure for setting up and configuring conveyor belt systems.',
      steps: [
        {
          id: 'step-101',
          title: 'Pre-operation Safety Check',
          description: 'Verify all safety guards are in place and emergency stops are functional.',  
          duration: 5,
          type: 'safety',
          tools: ['Safety Checklist', 'Visual Inspection'],
          checkpoints: ['Guards in place', 'E-stops working', 'Area clear']
        },
        {
          id: 'step-102',
          title: 'Belt Alignment Check',
          description: 'Ensure conveyor belt is properly aligned and tensioned.',
          duration: 10,
          type: 'inspection',
          tools: ['Tension Gauge', 'Alignment Tools'],
          checkpoints: ['Belt centered', 'Proper tension', 'No damage visible']
        },
        {
          id: 'step-103',
          title: 'Speed Configuration',
          description: 'Set conveyor speed according to production requirements.',
          duration: 10,
          type: 'operation',
          tools: ['Control Panel', 'Speed Reference Chart'],
          checkpoints: ['Speed set correctly', 'Controls responsive', 'Display accurate']
        },
        {
          id: 'step-104',
          title: 'Test Run',
          description: 'Perform test run to verify proper operation.',
          duration: 5,
          type: 'operation',
          tools: ['Test Materials', 'Stopwatch'],
          checkpoints: ['Smooth operation', 'No unusual noise', 'Speed consistent']
        }
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-600';
      case 'intermediate': return 'bg-yellow-600';
      case 'advanced': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'maintenance': return 'bg-blue-600';
      case 'operation': return 'bg-purple-600';
      case 'safety': return 'bg-red-600';
      case 'quality': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getStepTypeIcon = (type: string) => {
    switch (type) {
      case 'safety': return <AlertTriangle className="w-4 h-4" />;
      case 'operation': return <Play className="w-4 h-4" />;
      case 'inspection': return <CheckCircle className="w-4 h-4" />;
      case 'maintenance': return <Settings className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const completeStep = (stepIndex: number) => {
    setCompletedSteps(prev => new Set([...prev, stepIndex]));
    if (stepIndex < selectedInstruction!.steps.length - 1) {
      setCurrentStep(stepIndex + 1);
    }
  };

  const progressPercentage = selectedInstruction 
    ? (completedSteps.size / selectedInstruction.steps.length) * 100 
    : 0;

  if (!selectedInstruction) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Navigation />
        
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Digital Work Instructions</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workInstructions.map((instruction) => (
                <Card key={instruction.id} className="bg-slate-800 border-slate-700 cursor-pointer hover:border-slate-600 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-lg">{instruction.title}</CardTitle>
                      <div className="flex gap-2">
                        <Badge className={getCategoryColor(instruction.category)}>
                          {instruction.category}
                        </Badge>
                        <Badge className={getDifficultyColor(instruction.difficulty)}>
                          {instruction.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-400 text-sm">{instruction.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {instruction.estimatedTime} min
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {instruction.steps.length} steps
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm text-slate-400">Required Skills:</div>
                      <div className="flex flex-wrap gap-1">
                        {instruction.requiredSkills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-slate-600 text-slate-300">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => setSelectedInstruction(instruction)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Start Instructions
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  const currentStepData = selectedInstruction.steps[currentStep];

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">{selectedInstruction.title}</h1>
              <div className="flex items-center gap-4 mt-2">
                <Progress value={progressPercentage} className="w-64" />
                <span className="text-slate-400">
                  Step {currentStep + 1} of {selectedInstruction.steps.length}
                </span>
              </div>
            </div>
            <Button 
              onClick={() => setSelectedInstruction(null)}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              Back to Instructions
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Step */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded ${getCategoryColor(currentStepData.type)}`}>
                      {getStepTypeIcon(currentStepData.type)}
                    </div>
                    <div>
                      <CardTitle className="text-white">{currentStepData.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-slate-400 mt-1">
                        <Clock className="w-4 h-4" />
                        {currentStepData.duration} minutes
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-slate-300 text-lg">{currentStepData.description}</p>
                  
                  {/* Media */}
                  {currentStepData.media && (
                    <div className="bg-slate-700 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        {currentStepData.media.type === 'video' && <Video className="w-5 h-5 text-blue-400" />}
                        {currentStepData.media.type === 'image' && <CheckCircle className="w-5 h-5 text-green-400" />}
                        {currentStepData.media.type === 'document' && <FileText className="w-5 h-5 text-yellow-400" />}
                        <span className="text-white font-medium">
                          {currentStepData.media.type === 'video' && 'Video Guide'}
                          {currentStepData.media.type === 'image' && 'Reference Image'}
                          {currentStepData.media.type === 'document' && 'Documentation'}
                        </span>
                      </div>
                      <img 
                        src={currentStepData.media.thumbnail} 
                        alt="Step media"
                        className="w-full h-48 object-cover rounded"
                      />
                    </div>
                  )}

                  {/* Warnings */}
                  {currentStepData.warnings && currentStepData.warnings.length > 0 && (
                    <Alert className="bg-red-900/50 border-red-600">
                      <AlertTriangle className="w-4 h-4" />
                      <AlertDescription className="text-red-200">
                        <div className="font-medium mb-2">Safety Warnings:</div>
                        <ul className="list-disc list-inside space-y-1">
                          {currentStepData.warnings.map((warning, index) => (
                            <li key={index}>{warning}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Required Tools */}
                  <div className="space-y-2">
                    <h4 className="text-white font-medium flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Required Tools
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentStepData.tools.map((tool, index) => (
                        <Badge key={index} variant="outline" className="border-slate-600 text-slate-300">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Checkpoints */}
                  <div className="space-y-2">
                    <h4 className="text-white font-medium">Completion Checkpoints</h4>
                    <div className="space-y-2">
                      {currentStepData.checkpoints.map((checkpoint, index) => (
                        <div key={index} className="flex items-center gap-2 text-slate-300">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          {checkpoint}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-6 border-t border-slate-700">
                    <Button
                      onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                      disabled={currentStep === 0}
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      <SkipBack className="w-4 h-4 mr-2" />
                      Previous
                    </Button>

                    <Button
                      onClick={() => completeStep(currentStep)}
                      disabled={completedSteps.has(currentStep)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      {completedSteps.has(currentStep) ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Completed
                        </>
                      ) : (
                        'Mark Complete'
                      )}
                    </Button>

                    <Button
                      onClick={() => setCurrentStep(Math.min(selectedInstruction.steps.length - 1, currentStep + 1))}
                      disabled={currentStep === selectedInstruction.steps.length - 1}
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      Next
                      <SkipForward className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Steps Overview */}
            <div className="space-y-4">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Progress Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selectedInstruction.steps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`p-3 rounded cursor-pointer transition-colors ${
                        index === currentStep
                          ? 'bg-blue-600 text-white'
                          : completedSteps.has(index)
                          ? 'bg-green-600 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                      onClick={() => setCurrentStep(index)}
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex-shrink-0">
                          {completedSteps.has(index) ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-current" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{step.title}</div>
                          <div className="text-xs opacity-75">{step.duration} min</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Session Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Total Time</span>
                    <span className="text-white">{selectedInstruction.estimatedTime} min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Completed</span>
                    <span className="text-green-400">{completedSteps.size}/{selectedInstruction.steps.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Progress</span>
                    <span className="text-white">{Math.round(progressPercentage)}%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorkInstructions;