export function Footer() {
  return <footer className="bg-white py-24 px-6 md:px-12">
      <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <h4 className="text-xl font-medium text-zinc-900">Quick Links</h4>
          <ul className="space-y-4 text-zinc-600">
            <li>
              <a href="#" className="hover:text-zinc-900">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-zinc-900">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-zinc-900">
                Projects
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-zinc-900">
                Gallery
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-zinc-900">
                Reviews
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-xl font-medium text-zinc-900">Resources</h4>
          <ul className="space-y-4 text-zinc-600">
            <li>
              <a href="#" className="hover:text-zinc-900">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-zinc-900">
                Licenses
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-xl font-medium text-zinc-900">Contact</h4>
          <ul className="space-y-4 text-zinc-600">
            <li>
              <a href="mailto:hi@woodland.com" className="hover:text-zinc-900">
                contact@tilesandfitt.com
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-zinc-900">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-zinc-900">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-xl font-medium text-zinc-900">Newsletter</h4>
          <form className="space-y-4">
            <label className="text-sm text-zinc-500">Your email address</label>
            <div className="flex flex-col gap-2">
              <input type="email" className="w-full bg-zinc-50 border-none p-3 focus:ring-1 focus:ring-zinc-900" />
              <button type="submit" className="bg-zinc-900 text-white text-xs font-bold uppercase tracking-widest py-3 hover:bg-zinc-800 transition-colors">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto mt-24 pt-8 border-t border-zinc-100 flex gap-8 text-sm text-zinc-500">
        <a href="#">Privacy Policy</a>
        <a href="#">Cookie Policy</a>
      </div>
    </footer>;
}