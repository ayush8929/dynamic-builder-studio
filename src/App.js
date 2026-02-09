"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toaster_1 = require("@/components/ui/toaster");
var sonner_1 = require("@/components/ui/sonner");
var tooltip_1 = require("@/components/ui/tooltip");
var react_query_1 = require("@tanstack/react-query");
var react_router_dom_1 = require("react-router-dom");
var ThemeContext_1 = require("@/context/ThemeContext");
var Landing_1 = require("./pages/Landing");
var Builder_1 = require("./pages/Builder");
var MyResumes_1 = require("./pages/MyResumes");
var NotFound_1 = require("./pages/NotFound");
var queryClient = new react_query_1.QueryClient();
var App = function () { return (<react_query_1.QueryClientProvider client={queryClient}>
    <ThemeContext_1.ThemeProvider>
      <tooltip_1.TooltipProvider>
        <toaster_1.Toaster />
        <sonner_1.Toaster />
        <react_router_dom_1.BrowserRouter>
          <react_router_dom_1.Routes>
            <react_router_dom_1.Route path="/" element={<Landing_1.default />}/>
            <react_router_dom_1.Route path="/builder" element={<Builder_1.default />}/>
            <react_router_dom_1.Route path="/builder/:id" element={<Builder_1.default />}/>
            <react_router_dom_1.Route path="/resumes" element={<MyResumes_1.default />}/>
            <react_router_dom_1.Route path="*" element={<NotFound_1.default />}/>
          </react_router_dom_1.Routes>
        </react_router_dom_1.BrowserRouter>
      </tooltip_1.TooltipProvider>
    </ThemeContext_1.ThemeProvider>
  </react_query_1.QueryClientProvider>); };
exports.default = App;
