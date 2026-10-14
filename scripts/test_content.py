import importlib.util
import pathlib
import unittest

spec = importlib.util.spec_from_file_location("check_content", pathlib.Path(__file__).with_name("check-content.py"))
checker = importlib.util.module_from_spec(spec)
spec.loader.exec_module(checker)


class Routes(unittest.TestCase):
    def test_page_routes_and_hubs(self):
        root = checker.ROOT.resolve()
        self.assertEqual(checker.target_path(checker.ROOT / "index.md", "/start/"), root / "start/index.md")
        self.assertEqual(checker.target_path(checker.ROOT / "start/index.md", "../rules/"), root / "rules/index.md")
        self.assertEqual(checker.target_path(checker.ROOT / "start/first-steps.md", "../../rules/"), root / "rules/index.md")
        self.assertEqual(checker.target_path(checker.ROOT / "index.md", "/start/first-steps/?q=1#接続"), root / "start/first-steps.md")

    def test_external_and_same_page(self):
        for link in ["https://example.com/", "mailto:test@example.invalid", "#接続"]:
            self.assertIsNone(checker.target_path(checker.ROOT / "index.md", link))

    def test_escape(self):
        with self.assertRaises(ValueError):
            checker.target_path(checker.ROOT / "index.md", "../../private")

    def test_public_images(self):
        source = checker.ROOT / "community/wallpapers.md"
        self.assertEqual(checker.target_path(source, "/images/seesaa/example.png"), pathlib.Path("public/images/seesaa/example.png").resolve())
        with self.assertRaises(ValueError):
            checker.target_path(source, "/images/%2e%2e/private.png")


if __name__ == "__main__":
    unittest.main()
