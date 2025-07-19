
"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Camera, Loader2, ScanLine, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { analyzeTextbookPage } from '@/ai/flows/analyze-textbook-page';

export default function ScanPage() {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('Camera API not supported in this browser.');
        setHasCameraPermission(false);
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this feature.',
        });
      }
    };

    getCameraPermission();

    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [toast]);

  const handleScan = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    setIsScanning(true);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    const dataUri = canvas.toDataURL('image/jpeg');

    try {
      toast({
        title: "Analyzing Page...",
        description: "The AI is identifying the chapter. This might take a moment.",
      });
      const result = await analyzeTextbookPage({ photoDataUri: dataUri });

      if (result && result.chapterId > 0) {
        toast({
          title: "Success!",
          description: `Navigating you to Chapter ${result.chapterId}.`,
        });
        router.push(`/chapter/${result.chapterId}`);
      } else {
        toast({
          variant: 'destructive',
          title: 'Chapter Not Found',
          description: "Couldn't identify a chapter from the image. Please try again with a clearer picture.",
        });
      }
    } catch (error) {
      console.error('Error analyzing page:', error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'Something went wrong during the analysis. Please try again.',
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary flex items-center justify-center gap-4">
          <Camera className="w-10 h-10" />
          Smart Bookmark Scanner
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Point your camera at a textbook page to find related content.
        </p>
      </header>
      <main className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Camera View</CardTitle>
            <CardDescription>Position your textbook page clearly in the frame below.</CardDescription>
          </CardHeader>
          <CardContent>
            {hasCameraPermission === null && (
              <div className="flex items-center justify-center h-64 bg-muted rounded-md">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                <p className="ml-2">Requesting camera access...</p>
              </div>
            )}
            {hasCameraPermission === false && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Camera Access Required</AlertTitle>
                <AlertDescription>
                  This feature needs camera access. Please enable it in your browser settings and refresh the page.
                </AlertDescription>
              </Alert>
            )}
            {hasCameraPermission && (
              <div className="relative">
                <video ref={videoRef} className="w-full aspect-video rounded-md" autoPlay muted playsInline />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <ScanLine className="w-1/2 h-1/2 text-white/20 animate-pulse" />
                </div>
              </div>
            )}
            <canvas ref={canvasRef} className="hidden"></canvas>
            <Button
              onClick={handleScan}
              disabled={!hasCameraPermission || isScanning}
              className="w-full mt-4"
              size="lg"
            >
              {isScanning ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Camera className="mr-2 h-5 w-5" />
              )}
              {isScanning ? 'Analyzing...' : 'Scan Page'}
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
