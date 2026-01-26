export function Footer() {
  return <footer className="bg-white dark:bg-zinc-900 py-24 px-6 md:px-12 border-t border-zinc-100 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <h4 className="text-xl font-medium text-zinc-900 dark:text-white">Quick Links</h4>
          <ul className="space-y-4 text-zinc-600 dark:text-zinc-400">
            <li>
              <a href="#" className="hover:text-zinc-900 dark:hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-zinc-900 dark:hover:text-white">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-zinc-900 dark:hover:text-white">
                Projects
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-zinc-900 dark:hover:text-white">
                Gallery
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-zinc-900 dark:hover:text-white">
                Reviews
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-xl font-medium text-zinc-900 dark:text-white">Resources</h4>
          <ul className="space-y-4 text-zinc-600 dark:text-zinc-400">
            <li>
              <a href="#" className="hover:text-zinc-900 dark:hover:text-white">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-zinc-900 dark:hover:text-white">
                Licenses
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-xl font-medium text-zinc-900 dark:text-white">Contact</h4>
          <ul className="space-y-4 text-zinc-600 dark:text-zinc-400">
            <li>
              <a href="mailto:hi@woodland.com" className="hover:text-zinc-900 dark:hover:text-white">
                contact@tilesandfitt.com
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-zinc-900 dark:hover:text-white">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-zinc-900 dark:hover:text-white">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-xl font-medium text-zinc-900 dark:text-white">Newsletter</h4>
          <form className="space-y-4">
            <label className="text-sm text-zinc-500 dark:text-zinc-400">Your email address</label>
            <div className="flex flex-col gap-2">
              <input type="email" className="w-full bg-zinc-50 dark:bg-zinc-800 border-none p-3 focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-400 text-zinc-900 dark:text-white" />
              <button type="submit" className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold uppercase tracking-widest py-3 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto mt-24 pt-8 border-t border-zinc-100 dark:border-zinc-800 flex gap-8 text-sm text-zinc-500 dark:text-zinc-400">
        <a href="#">Privacy Policy</a>
        <a href="#">Cookie Policy</a>
      </div>
    </footer>;
}