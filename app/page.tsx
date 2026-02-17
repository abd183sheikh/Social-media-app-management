import Link from "next/link";
import { Users, BarChart3, Calendar, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">SocialHub</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Manage All Your Social Media in{" "}
            <span className="text-blue-600">One Place</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Schedule posts, track analytics, and grow your audience across Instagram,
            Facebook, and Twitter with our powerful management platform.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/register"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
            >
              Start Free Trial
            </Link>
            <Link
              href="/login"
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-lg"
            >
              View Demo
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Schedule Posts
            </h3>
            <p className="text-gray-600">
              Plan and schedule your content across all platforms. Never miss the
              perfect posting time.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-7 w-7 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Track Analytics
            </h3>
            <p className="text-gray-600">
              Monitor your growth with detailed analytics. Understand what content
              performs best.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="h-7 w-7 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Grow Faster
            </h3>
            <p className="text-gray-600">
              Leverage insights to optimize your strategy and accelerate your
              social media growth.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="container mx-auto px-6 text-center text-gray-500">
          <p>© 2024 SocialHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
